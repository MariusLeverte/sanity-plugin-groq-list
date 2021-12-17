import {PublishIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Inline, Stack, Text, TextInput, Tooltip} from '@sanity/ui'
import React, {useState} from 'react'
import PropTypes from 'prop-types'

const DocumentFooter = ({query, onTestRun, results, onSaveQuery, onDeleteQuery, document}) => {
  const [documentTitle, setDocumentTitle] = useState('')

  const hasResults = results && results?.length !== 0
  const hasQuery = query
  const resultsHasIds = hasResults && results.every(({_id}) => _id)

  const canSave = () => {
    if (!hasResults) return false
    if (!hasQuery) return false
    return resultsHasIds
  }

  return (
    <Card shadow={1} padding={4}>
      <Flex align="flex-end">
        <Stack space={3}>
          <Text size={2} weight="semibold">
            Title
          </Text>
          <TextInput
            fontSize={2}
            onChange={(event) => setDocumentTitle(event.currentTarget.value)}
            placeholder="Title"
            value={documentTitle || document?.title || ''}
          />
        </Stack>
        <Flex flex={1} justify="flex-end">
          <Inline space={3}>
            {query && (
              <Button
                fontSize={2}
                text="Test run"
                tone="primary"
                onClick={() => onTestRun(query)}
              />
            )}
            {document && (
              <Button
                fontSize={2}
                icon={PublishIcon}
                text="Delete"
                tone="critical"
                onClick={onDeleteQuery}
              />
            )}
            <Tooltip
              content={
                <Box padding={2}>
                  <Text muted size={1}>
                    {!query && 'Missing query'}
                    {query && !hasResults && 'Missing results'}
                    {query && hasResults && !resultsHasIds && 'Missing ids on results'}
                  </Text>
                </Box>
              }
              fallbackPlacements={['right', 'left']}
              placement="top"
              portal
              disabled={canSave()}
            >
              <Button
                fontSize={2}
                icon={PublishIcon}
                text="Publish"
                tone="primary"
                style={{opacity: !canSave() ? '0.5' : 1}}
                onClick={() => canSave() && onSaveQuery(documentTitle || document?.title)}
              />
            </Tooltip>
          </Inline>
        </Flex>
      </Flex>
    </Card>
  )
}

DocumentFooter.defaultProps = {
  query: null,
  results: null,
  document: null,
}

DocumentFooter.propTypes = {
  query: PropTypes.string,
  onTestRun: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  onSaveQuery: PropTypes.func.isRequired,
  onDeleteQuery: PropTypes.func.isRequired,
  document: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
}

export default DocumentFooter
