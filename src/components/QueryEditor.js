import React from 'react'
import {UnControlled as BaseReactCodeMirror} from 'react-codemirror2'

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

export default QueryEditor
