import { useState, useEffect } from 'react'

// Use relative /api/ path — Vercel rewrites it to EC2 (avoids mixed-content HTTPS→HTTP block)
const API = ''

// Records a visit and returns { count, total } for the given slug (e.g. "merge-pdf")
export function usePageView(slug) {
  const [count, setCount] = useState(null)
  const [total, setTotal] = useState(null)

  useEffect(() => {
    if (!slug) return
    fetch(`${API}/api/stats/visit?page=${encodeURIComponent(slug)}`, { method: 'POST' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setCount(data.count)
          setTotal(data.total)
        }
      })
      .catch(() => {})
  }, [slug])

  return { count, total }
}

// Fetch overall total + all page counts without recording a visit (for homepage)
export function useSiteStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/stats/total`, { cache: 'no-store' })
      .then(r => r.ok && r.headers.get('content-type')?.includes('application/json') ? r.json() : null)
      .then(data => { if (data) setStats(data) })
      .catch(() => {})
  }, [])

  return stats
}
