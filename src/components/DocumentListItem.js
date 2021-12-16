import React from 'react'
import PropTypes from 'prop-types'
import {SanityPreview} from '@sanity/base/preview'
import schema from 'part:@sanity/base/schema'
import {Card, Box} from '@sanity/ui'

const DocumentListItem = ({document, onClick, selected}) => {
  const schemaType = schema.get(document._type) ?? {
    jsonType: 'object',
    name: document._type,
    title: document.title,
  }

  return (
    <Box paddingX={2} as="li">
      <Card
        data-ui="PaneItem"
        padding={2}
        radius={2}
        tone={selected && 'primary'}
        onClick={onClick}
      >
        <SanityPreview layout="default" value={document} type={schemaType} />
      </Card>
    </Box>
  )
}

DocumentListItem.defaultProps = {
  selected: false,
}

DocumentListItem.propTypes = {
  document: PropTypes.shape({
    _type: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
}

export default DocumentListItem
