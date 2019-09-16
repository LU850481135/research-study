import { parse, stringify } from 'qs'
import { isEmpty } from 'lodash'

export default {
  getQuery: (link) => {
    return parse(link.split('?')[1])
  },
  getQueryString: (path, params) => {
    return `${path}${isEmpty(params) ? '' : '?' + stringify(params)}`
  }
}
