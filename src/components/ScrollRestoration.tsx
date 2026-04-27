'use client'

import { useEffect } from 'react'

/**
 * Disables browser scroll restoration and scrolls to top on every mount.
 * Prevents browsers from restoring a mid-page scroll position on refresh.
 */
export function ScrollRestoration() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return null
}
