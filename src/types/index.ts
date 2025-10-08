export interface StreamingContent {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  videoUrl?: string
  year?: number
  genre: string[]
  rating?: number
  duration?: number
  cast: string[]
  imdbId?: string
  type: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name?: string
  profileImage?: string
  createdAt: string
}

export interface WatchHistoryItem {
  id: string
  userId: string
  contentId: string
  watchProgress: number
  lastWatchedAt: string
  completed: boolean
  content?: StreamingContent
}

export interface MyListItem {
  id: string
  userId: string
  contentId: string
  addedAt: string
  content?: StreamingContent
}

export interface UserPreferences {
  id: string
  userId: string
  autoplayNext: boolean
  autoplayPreviews: boolean
  maturityLevel: string
  language: string
}
