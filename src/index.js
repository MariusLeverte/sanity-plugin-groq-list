import React from 'react'
import {route} from 'part:@sanity/base/router'
import View from './View'

export default {
  title: 'Groq list',
  name: 'groq-list',
  router: route('/:selectedDocumentId'),
  component: View,
}
