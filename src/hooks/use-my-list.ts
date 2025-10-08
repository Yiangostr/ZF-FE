import { useState, useEffect, useCallback } from 'react'
import { showToast } from '@/components/ui/toast'
import config from '@/config/constants.json'

const MY_LIST_STORAGE_KEY = config.localStorage.myListKey

export const useMyList = () => {
  const [myList, setMyList] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(MY_LIST_STORAGE_KEY)
    setMyList(stored ? JSON.parse(stored) : [])

    const handleUpdate = () => {
      const updated = localStorage.getItem(MY_LIST_STORAGE_KEY)
      setMyList(updated ? JSON.parse(updated) : [])
    }

    window.addEventListener('mylist-updated', handleUpdate)
    return () => window.removeEventListener('mylist-updated', handleUpdate)
  }, [])

  const saveList = useCallback((list: string[], isAdding: boolean) => {
    localStorage.setItem(MY_LIST_STORAGE_KEY, JSON.stringify(list))
    setMyList(list)
    window.dispatchEvent(new Event('mylist-updated'))

    showToast({
      message: isAdding ? config.toast.addedToList : config.toast.removedFromList,
      type: 'success',
      duration: 2000,
    })
  }, [])

  const isInList = useCallback(
    (contentId: string) => {
      return myList.includes(contentId)
    },
    [myList]
  )

  const toggleList = useCallback(
    (contentId: string) => {
      const isCurrentlyInList = isInList(contentId)
      if (isCurrentlyInList) {
        saveList(
          myList.filter((id) => id !== contentId),
          false
        )
      } else {
        saveList([...myList, contentId], true)
      }
    },
    [myList, isInList, saveList]
  )

  return { myList, isInList, toggleList }
}
