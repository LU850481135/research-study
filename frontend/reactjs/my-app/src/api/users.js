import http from './http'
import { processResponse } from './util'

export default {
  login(username, password) {
    return processResponse(
      http.post(`/api/login`, {
        auth: {
          username,
          password
        }
      })
    )
  }
}
