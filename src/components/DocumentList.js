import React from 'react'
import PropTypes from 'prop-types'
import {Card, Flex, Box, Spinner, Text, Stack} from '@sanity/ui'

const DocumentList = ({children}) => {
  if (!children) {
    return (
      <Card flex={1} padding={4}>
        <Flex direction="column" justify="center" align="center">
          <Spinner muted />
          <Box marginTop={3}>
            <Text muted>Loading documents…</Text>
          </Box>
        </Flex>
      </Card>
    )
  }

  return (
    <Card paddingY={2} flex={1} overflow="auto" as="ul">
      <Stack space={1}>{children}</Stack>
    </Card>
  )
}

DocumentList.defaultProps = {
  children: null,
}

DocumentList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default DocumentList
