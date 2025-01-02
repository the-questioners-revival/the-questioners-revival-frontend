export const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}` || ''
export const FRONTEND_URL = `${process.env.REACT_APP_FRONTEND_URL}` || ''
export const GITHUB_KEY = `${process.env.REACT_APP_GITHUB_KEY}` || ''
export const BACKEND_WS_URL = BACKEND_URL.replace(/^http/, 'ws')
export const API_URL = `${BACKEND_URL}/api/v1`
export const FALLBACK_LANGUAGE = 'de'
