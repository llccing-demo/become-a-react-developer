import { useState, useEffect, useRef } from 'react'

/**
 * use useState, useRef implement debounce of the state. 
 * note that it's state not a fn as a input parameter.
 * @param {oldState, state vlaue, timeout, just timeout} param0 
 * @returns 
 */
export function useDebounce({ oldState, timeout }) {
  const [state, setState] = useState(oldState)

  const invokeRef = useRef(null);

  useEffect(() => {

    invokeRef.current = setTimeout(() => {
      setState(oldState)
    }, timeout)

    return () => {
      clearTimeout(invokeRef.current)
    }

  }, [oldState, timeout])

  return state
}