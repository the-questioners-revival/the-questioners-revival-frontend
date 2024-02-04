import axios from 'axios'
import { getCookies } from '../utils'

export const getToken = () => getCookies('token')

function API() {
  function handleOffline(error) {
    if (!error.response && window.location.pathname !== '/') {
      window.location.pathname = '/'
    }
  }

  async function get(url, auth = false, params?) {
    let err
    const token = getToken()
    const headers =
      auth && token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}

    const res = await axios
      .get(url, {
        headers,
        params
      })
      .catch((error) => {
        handleOffline(error)
        err = error
      })

    return { res, err }
  }

  async function post(url, data, auth = false, options?) {
    let err

    const token = getToken()
    const headers =
      auth && token
        ? {
            Authorization: `Bearer ${token}`,
            ...options,
          }
        : {}

    const res = await axios
      .post(url, data, {
        headers,
      })
      .catch((error) => {
        handleOffline(error)
        err = error
      })

    return { res, err }
  }

  async function put(url, data, auth = false) {
    let err

    const token = getToken()
    const headers =
      auth && token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}
    
    const res = await axios
      .put(
        url,
        { ...data },
        {
          headers,
        },
      )
      .catch((error) => {
        handleOffline(error)
        err = error
      })

    return { res, err }
  }

  async function remove(url, auth = false) {
    let err

    const token = getToken()
    const headers =
      auth && token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}

    const res = await axios
      .delete(url, {
        headers,
      })
      .catch((error) => {
        handleOffline(error)
        err = error
      })

    return { res, err }
  }

  return { get, post, put, remove }
}

export default API
