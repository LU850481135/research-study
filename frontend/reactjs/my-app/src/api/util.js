import { message } from 'antd'

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
      const error = err.response.data.error
      if (Number(status) === 401 && window.location.pathname !== '/login') {
        window.location = '/login'
      } else {
        const errorMessage = `${status || ''} ${error.message || '未知错误'}`
        message.error(errorMessage)
        if (error.detail) {
          console.warn(error.detail)
        }
        throw err
      }
    })
}
