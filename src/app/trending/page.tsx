'use client'

import { useState, useMemo } from 'react'
import { ContentRow } from '@/components/streaming/content-row'
import { ContentModal } from '@/components/streaming/content-modal'
import { VideoPlayer } from '@/components/streaming/video-player'
import { ContentRowSkeleton } from '@/components/ui/skeleton'
import { useStreamingContent } from '@/features/streaming/hooks/use-streaming-content'
import { useWatchHistory } from '@/features/streaming/hooks/use-watch-history'
import { StreamingContent } from '@/types'
import config from '@/config/constants.json'
import ProtectedRoute from '@/components/auth/protected-route'

function TrendingPageContent() {
  const { data: content, isLoading, error } = useStreamingContent()
  const { updateProgress } = useWatchHistory()
  const [selectedContent, setSelectedContent] = useState<StreamingContent | null>(null)
  const [playingContent, setPlayingContent] = useState<StreamingContent | null>(null)

  const trendingContent = useMemo(() => {
    if (!content) return []
    return content.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 20)
  }, [content])

  const trendingMovies = useMemo(() => {
    return trendingContent.filter((item) => item.type === 'movie')
  }, [trendingContent])

  const trendingSeries = useMemo(() => {
    return trendingContent.filter((item) => item.type === 'series')
  }, [trendingContent])

  const handlePlayContent = (item: StreamingContent) => {
    setPlayingContent(item)
    updateProgress(item.id, 10)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">{config.homepage.errorTitle}</h2>
          <p className="text-text-secondary">{config.homepage.errorMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-12 space-y-8">
      <div className="px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{config.trending.pageTitle}</h1>
        <p className="text-text-secondary">{config.trending.pageDescription}</p>
      </div>

      {isLoading ? (
        <>
          <ContentRowSkeleton />
          <ContentRowSkeleton />
          <ContentRowSkeleton />
        </>
      ) : (
        <>
          {trendingContent.length > 0 && (
            <ContentRow
              title={config.trending.trendingNowTitle}
              content={trendingContent}
              onContentClick={setSelectedContent}
              onPlayClick={handlePlayContent}
            />
          )}

          {trendingMovies.length > 0 && (
            <ContentRow
              title={config.trending.trendingMoviesTitle}
              content={trendingMovies}
              onContentClick={setSelectedContent}
              onPlayClick={handlePlayContent}
            />
          )}

          {trendingSeries.length > 0 && (
            <ContentRow
              title={config.trending.trendingSeriesTitle}
              content={trendingSeries}
              onContentClick={setSelectedContent}
              onPlayClick={handlePlayContent}
            />
          )}
        </>
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

export default function TrendingPage() {
  return (
    <ProtectedRoute>
      <TrendingPageContent />
    </ProtectedRoute>
  )
}
