import React from 'react'
import PropTypes from 'prop-types'
import {UnControlled as BaseReactCodeMirror} from 'react-codemirror2'
import 'codemirror/theme/material.css'
require('codemirror/mode/javascript/javascript')

const QueryEditor = ({query, handleChange}) => (
  <BaseReactCodeMirror
    value={query}
    options={{
      mode: {name: 'javascript', json: true},
      theme: 'material',
      lineNumbers: true,
      tabSize: 2,
      autoCloseBrackets: true,
    }}
    onChange={handleChange}
  />
)

QueryEditor.propTypes = {
  query: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

QueryEditor.defaultProps = {
  query: '',
}

export default QueryEditor
