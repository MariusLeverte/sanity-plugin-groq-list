import React, {useCallback, useEffect, useState} from 'react'
import sanityClient from 'part:@sanity/base/client'
import {useRouter} from 'part:@sanity/base/router'
import {ThemeProvider, studioTheme, Flex, Card} from '@sanity/ui'
import QueryEditor from './components/QueryEditor'
import DocumentFooter from './components/DocumentFooter'
import Panel from './components/Panel'
import DocumentList from './components/DocumentList'
import DocumentListItem from './components/DocumentListItem'

const client = sanityClient.withConfig({apiVersion: '2021-06-07'})

const View = () => {
  const router = useRouter()
  const {selectedDocumentId} = router.getState()

  const [documents, setDocuments] = useState(null)
  const [queryDocuments, setQueryDocuments] = useState(null)
  const [currentQueryDocument, setCurrentQueryDocument] = useState(null)
  const [currentQueryDocumentId, setCurrentQueryDocumentId] = useState(selectedDocumentId ?? null)

  const [documentQuery, setDocumentQuery] = useState(null)

  const findMatchingDocument = (items, documentId) => items.find(({_id}) => _id === documentId)

  const clearStates = useCallback(() => {
    if (queryDocuments) setQueryDocuments(null)
    if (currentQueryDocument) setCurrentQueryDocument(null)
    if (currentQueryDocumentId) setCurrentQueryDocumentId(null)
    if (documentQuery) setDocumentQuery(null)
  }, [queryDocuments, currentQueryDocument, currentQueryDocumentId, documentQuery])
  const setDocumentStates = useCallback(
    (documentId) => {
      const document = findMatchingDocument(documents, documentId)
      setCurrentQueryDocumentId(documentId)
      setCurrentQueryDocument(document)
      setDocumentQuery(document?.query)
    },
    [documents]
  )

  const handleReceiveList = useCallback(
    (list) => {
      setDocuments(list)
      setCurrentQueryDocument(
        findMatchingDocument(list, selectedDocumentId || currentQueryDocumentId)
      )
    },
    [selectedDocumentId, currentQueryDocumentId]
  )
  const handleChange = useCallback((editor, data, value) => setDocumentQuery(value), [])
  const handleSelectDocument = useCallback(
    (documentId) => {
      if (!documentId || documentId !== currentQueryDocumentId) {
        clearStates()
      }

      setDocumentStates(documentId)

      router.navigate({selectedDocumentId: documentId})
    },
    [documents, currentQueryDocumentId, clearStates, setDocumentStates]
  )
  const handleNavigateToDocument = (document) =>
    router.navigateIntent('edit', {
      id: document._id,
      type: document._type,
    })

  const fetchGroqDocuments = () => {
    client.fetch('*[_type == "groq-list"]').then(handleReceiveList)
  }

  const runQuery = async (query) => {
    const result = await client.fetch(query)

    const resultArray = Array.isArray(result) ? result : [result]
    const filterArray = resultArray.filter(({_type}) => _type !== 'groq-list')

    setQueryDocuments(filterArray)
  }
  const saveQuery = useCallback(
    async (title) => {
      try {
        const doc = {
          _id: currentQueryDocumentId,
          _type: 'groq-list',
          title: title ?? documentQuery,
          query: documentQuery,
        }
        if (doc._id) await client.createOrReplace(doc)
        else {
          const result = await client.create(doc)
          await router.navigate({selectedDocumentId: result._id})
          await setCurrentQueryDocumentId(result._id)
        }

        await fetchGroqDocuments()
      } catch (e) {
        console.error(e)
      }
    },
    [documentQuery, currentQueryDocumentId, handleReceiveList]
  )
  const deleteQuery = useCallback(async () => {
    try {
      await client.delete(currentQueryDocumentId)
      handleSelectDocument(null)
      fetchGroqDocuments()
    } catch (e) {
      console.error(e)
    }
  }, [currentQueryDocumentId, handleSelectDocument])

  useEffect(() => {
    const subscription = fetchGroqDocuments()

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    if (!currentQueryDocumentId) return
    if (!documents) return
    if (!currentQueryDocument) return
    if (queryDocuments) return

    runQuery(currentQueryDocument.query)
  }, [currentQueryDocumentId, currentQueryDocument, documents, queryDocuments])

  return (
    <ThemeProvider theme={studioTheme}>
      <Flex direction="column" flex={1} style={{overflow: 'auto'}}>
        <Flex style={{height: '100%', width: '100%'}} flex={1}>
          <Panel>
            <Flex direction="column" style={{height: '100%'}}>
              <DocumentList>
                {documents &&
                  documents.map((doc) => {
                    const documentSelected = currentQueryDocumentId === doc._id

                    return (
                      <DocumentListItem
                        key={doc._id}
                        document={doc}
                        selected={documentSelected}
                        onClick={() => handleSelectDocument(documentSelected ? null : doc._id)}
                      />
                    )
                  })}
              </DocumentList>
              <QueryEditor
                query={documentQuery || currentQueryDocument?.query}
                handleChange={handleChange}
              />
            </Flex>
          </Panel>
          {queryDocuments && (
            <Card overflow="auto" padding={4} flex={1}>
              <DocumentList>
                {queryDocuments.map((doc) => (
                  <DocumentListItem
                    key={doc._id}
                    document={doc}
                    onClick={() => handleNavigateToDocument(doc)}
                  />
                ))}
              </DocumentList>
            </Card>
          )}
        </Flex>
        <DocumentFooter
          document={currentQueryDocument}
          query={documentQuery}
          onTestRun={runQuery}
          results={queryDocuments}
          onSaveQuery={saveQuery}
          onDeleteQuery={deleteQuery}
        />
      </Flex>
    </ThemeProvider>
  )
}

export default View
