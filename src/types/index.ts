export interface StreamingContent {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  videoUrl?: string
  year?: number
  genre?: string[]
  rating?: number
  duration?: number
  cast?: string[]
  watchProgress?: number
  imdbId?: string
  type: 'movie' | 'series'
  createdAt: Date
}

export interface WatchHistoryItem {
  contentId: string
  progress: number
  lastWatched: Date
}
