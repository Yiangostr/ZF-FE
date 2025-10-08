import { useCallback, useState, useEffect } from 'react'
import { WatchHistoryItem } from '@/types'
import config from '@/config/constants.json'

const STORAGE_KEY = config.storage.watchHistoryKey

export const useWatchHistory = () => {
  const [history, setHistory] = useState<WatchHistoryItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setHistory(stored ? JSON.parse(stored) : [])

    const handleUpdate = () => {
      const updated = localStorage.getItem(STORAGE_KEY)
      setHistory(updated ? JSON.parse(updated) : [])
    }

    window.addEventListener('watch-history-updated', handleUpdate)
    return () => window.removeEventListener('watch-history-updated', handleUpdate)
  }, [])

  const updateProgress = useCallback(
    (contentId: string, progress: number) => {
      const existing = history.findIndex((item) => item.contentId === contentId)
      const updated = [...history]

      if (existing >= 0) {
        updated[existing] = {
          ...updated[existing],
          progress,
          lastWatched: new Date(),
        }
      } else {
        updated.push({
          contentId,
          progress,
          lastWatched: new Date(),
        })
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new Event('watch-history-updated'))
    },
    [history]
  )

  const getProgress = useCallback(
    (contentId: string): number => {
      const item = history.find((h) => h.contentId === contentId)
      return item?.progress || 0
    },
    [history]
  )

  return { history, updateProgress, getProgress }
}
