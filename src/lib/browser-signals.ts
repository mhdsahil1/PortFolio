type Listener = () => void

const visibilityListeners = new Set<Listener>()

function notifyVisibilityListeners() {
  visibilityListeners.forEach((listener) => listener())
}

/** Share one document visibility listener across independent animation loops. */
export function subscribePageVisibility(listener: Listener) {
  if (typeof document === 'undefined') return () => undefined

  visibilityListeners.add(listener)
  if (visibilityListeners.size === 1) {
    document.addEventListener('visibilitychange', notifyVisibilityListeners)
  }

  return () => {
    visibilityListeners.delete(listener)
    if (visibilityListeners.size === 0) {
      document.removeEventListener('visibilitychange', notifyVisibilityListeners)
    }
  }
}
