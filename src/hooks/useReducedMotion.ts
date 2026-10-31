import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'
let mediaQuery: MediaQueryList | undefined
const subscribers = new Set<() => void>()

function getMediaQuery() {
  if (typeof window === 'undefined') return undefined
  mediaQuery ??= window.matchMedia(QUERY)
  return mediaQuery
}

function notifySubscribers() {
  subscribers.forEach((notify) => notify())
}

function subscribe(notify: () => void) {
  const query = getMediaQuery()
  if (!query) return () => undefined

  subscribers.add(notify)
  if (subscribers.size === 1) query.addEventListener('change', notifySubscribers)

  return () => {
    subscribers.delete(notify)
    if (subscribers.size === 0) query.removeEventListener('change', notifySubscribers)
  }
}

function getSnapshot() {
  return getMediaQuery()?.matches ?? false
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
