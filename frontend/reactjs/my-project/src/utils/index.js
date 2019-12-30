import moment from 'moment'
import * as common from '@/constants/common'

export default {
  formattedDate: (date) => {
    return moment(date).format(common.DATE_FORMAT)
  }
}