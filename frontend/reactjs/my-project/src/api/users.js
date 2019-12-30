import http from './http'
import { processResponse } from './util'

export default {
  login(username, password) {
    return processResponse(
      http.post(`/test/tokens`, {
        auth: {
          username,
          password,
        }
      })
    )
  },
  userInfo() {
    return processResponse(
      http.get(`/test/user`)
    )
  }
}
