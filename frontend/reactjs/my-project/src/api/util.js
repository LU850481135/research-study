import { message } from 'antd'
import { map } from 'lodash'
import * as common from '@/constants/common'

/**
 * Utility function for processing the response of http call using axios.
 * @param {*} response Response object
 * @return Promise
 */
export const processResponse = response => {
  return response
    .then(res => {
      if (res.data instanceof Array) {
        return res.data
      } else {
        return {
          ...res.data
        }
      }
    })
    .catch(err => {
      const status = err.response.status
      const errors = err.response.data.errors
      const error = err.response.data.error
      if (Number(status) === 401 && window.location.pathname !== common.LOGIN) {
        window.location = common.LOGIN
      } else {
        if (errors) {
          map(errors, (error) => {
            message.error(`${error.title || ''}`)
          })
        } else {
          message.error(`${error.message || ''}`)
        }
        throw err
      }
    })
}