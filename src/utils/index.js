import { useEffect } from 'react'
import moment from 'moment'
import Cookies from 'js-cookie'

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    return () => {
      document.title = prevTitle
    }
  })
}

export function showDate(date) {
  const dateDays = moment().diff(date, 'days')
  if (dateDays) return `${dateDays}d`
  const dateHours = moment().diff(date, 'hours')
  if (dateHours) return `${dateHours}h`
  const dateMinutes = moment().diff(date, 'minutes')
  if (dateMinutes) return `${dateMinutes}m`
  const dateSeconds = moment().diff(date, 'seconds')
  if (dateSeconds) return `${dateSeconds}s`
  return null
}

export function getCookies(name) {
  const cookie = Cookies.get(name)
  return cookie
}

export function setCookies(name, value, options) {
  Cookies.set(name, value, {
    ...options,
    secure: true,
    sameSite: 'strict',
  })
}

export function removeCookies(name) {
  return Cookies.remove(name)
}

export const FIVE_MEGA = 5048576

export const getRangeOfNumbers = (start: number, end: number) =>
  Array(end - start + 1)
    .fill('')
    .map((_, idx) => start + idx)
