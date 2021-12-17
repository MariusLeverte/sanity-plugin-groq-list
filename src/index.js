import {route} from 'part:@sanity/base/router'
import {ThListIcon} from '@sanity/icons'
import View from './View'
import config from 'config:groq-list'

export default {
  title: config.title || 'GROQ list',
  name: 'groq-list',
  router: route('/:selectedDocumentId'),
  component: View,
  icon: ThListIcon,
}
