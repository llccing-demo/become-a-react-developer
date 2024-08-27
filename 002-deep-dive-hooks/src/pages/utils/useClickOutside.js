import { useEffect } from 'react'
export function useClickOutside(ref, fn) {

  useEffect(() => {
    const listen = (e) => {
      if (!ref.current) { return }
      if (!ref.current.contains(e.target)) {
        fn && fn()
      }
    }

    window.addEventListener('mousedown', listen)

    return () => {
      window.removeEventListener('mousedown', listen)
    }
  }, [ref, fn])
}