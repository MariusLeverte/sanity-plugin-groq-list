import styled from 'styled-components'
import {Card} from '@sanity/ui'

const Panel = styled(Card)`
  width: 100%;
  min-width: 220px;
  max-width: 350px;
  height: 100%;
  padding: 0;
  margin: 0;
  border-right: 1px solid var(--card-border-color);
`

export default Panel
