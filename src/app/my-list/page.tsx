'use client'

import { useMemo, useState } from 'react'
import { ContentRow } from '@/components/streaming/content-row'
import { ContentModal } from '@/components/streaming/content-modal'
import { VideoPlayer } from '@/components/streaming/video-player'
import { ContentRowSkeleton } from '@/components/ui/skeleton'
import { useStreamingContent } from '@/features/streaming/hooks/use-streaming-content'
import { useWatchHistory } from '@/features/streaming/hooks/use-watch-history'
import { useMyList } from '@/hooks/use-my-list'
import { StreamingContent } from '@/types'
import config from '@/config/constants.json'
import ProtectedRoute from '@/components/auth/protected-route'

function MyListPageContent() {
  const { data: allContent, isLoading } = useStreamingContent()
  const { updateProgress } = useWatchHistory()
  const { myList } = useMyList()
  const [selectedContent, setSelectedContent] = useState<StreamingContent | null>(null)
  const [playingContent, setPlayingContent] = useState<StreamingContent | null>(null)

  const myListContent = useMemo(() => {
    if (!allContent || myList.length === 0) return []
    return allContent.filter((item) => myList.includes(item.id))
  }, [allContent, myList])

  const handlePlayContent = (item: StreamingContent) => {
    setPlayingContent(item)
    updateProgress(item.id, 10)
  }

  return (
    <div className="pt-20 pb-12 space-y-8">
      <div className="px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My List</h1>
        <p className="text-text-secondary">
          {myListContent.length} {myListContent.length === 1 ? 'title' : 'titles'}
        </p>
      </div>

      {isLoading ? (
        <ContentRowSkeleton />
      ) : myListContent.length === 0 ? (
        <div className="px-4 md:px-8 lg:px-12 text-center py-20">
          <div className="max-w-md mx-auto space-y-4">
            <svg
              className="w-20 h-20 mx-auto text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h2 className="text-xl font-semibold">{config.myList.emptyTitle}</h2>
            <p className="text-text-secondary">{config.myList.emptyMessage}</p>
          </div>
        </div>
      ) : (
        <div className="px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myListContent.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => setSelectedContent(item)}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-background-tertiary group">
                  {item.thumbnailUrl && (
                    <div
                      style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <button
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayContent(item)
                      }}
                      aria-label="Play"
                    >
                      <svg
                        className="w-4 h-4 text-black ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="uppercase text-[10px]">{item.type}</span>
                    {item.year && (
                      <>
                        <span>•</span>
                        <span>{item.year}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ContentModal
        content={selectedContent}
        isOpen={!!selectedContent}
        onClose={() => setSelectedContent(null)}
        onPlay={handlePlayContent}
      />

      {playingContent && (
        <VideoPlayer
          content={playingContent}
          onClose={() => setPlayingContent(null)}
          onProgress={(progress) => updateProgress(playingContent.id, progress)}
        />
      )}
    </div>
  )
}

export default function MyListPage() {
  return (
    <ProtectedRoute>
      <MyListPageContent />
    </ProtectedRoute>
  )
}
