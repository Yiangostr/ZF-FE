'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ContentRow } from '@/components/streaming/content-row'
import { ContentModal } from '@/components/streaming/content-modal'
import { VideoPlayer } from '@/components/streaming/video-player'
import { HeroSection } from '@/components/streaming/hero-section'
import { ContentTabs } from '@/components/streaming/content-tabs'
import { NoResults } from '@/components/streaming/no-results'
import { ContentRowSkeleton, HeroSkeleton } from '@/components/ui/skeleton'
import { useStreamingContent } from '@/features/streaming/hooks/use-streaming-content'
import { useWatchHistory } from '@/features/streaming/hooks/use-watch-history'
import { StreamingContent } from '@/types'
import config from '@/config/constants.json'
import ProtectedRoute from '@/components/auth/protected-route'

function HomePageContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || undefined
  const { data: content, isLoading, error } = useStreamingContent(searchQuery)
  const { updateProgress, history } = useWatchHistory()
  const [selectedContent, setSelectedContent] = useState<StreamingContent | null>(null)
  const [playingContent, setPlayingContent] = useState<StreamingContent | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'movie' | 'series'>('all')

  const heroContent = useMemo(() => content?.[0], [content])

  const continueWatchingContent = useMemo(() => {
    if (!content || history.length === 0) return []

    return history
      .filter((h) => h.progress > 5 && h.progress < 95)
      .map((h) => content.find((c) => c.id === h.contentId))
      .filter(Boolean)
      .slice(0, 10)
  }, [content, history])

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

  const filteredContent =
    content?.filter((item) => (activeTab === 'all' ? true : item.type === activeTab)) || []

  const trendingContent = filteredContent.slice(0, 4)
  const popularContent = filteredContent.slice(4, 10)
  const newReleasesContent = filteredContent.slice(2, 8)

  const handlePlayContent = (item: StreamingContent) => {
    setPlayingContent(item)
    updateProgress(item.id, 10)
  }

  return (
    <div className="pb-12">
      {!searchQuery &&
        (isLoading ? (
          <HeroSkeleton />
        ) : (
          heroContent && (
            <HeroSection
              content={heroContent}
              onPlay={() => handlePlayContent(heroContent)}
              onMoreInfo={() => setSelectedContent(heroContent)}
            />
          )
        ))}

      <div className={searchQuery ? 'pt-20 space-y-8' : 'space-y-8'}>
        {!searchQuery && <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />}

        {isLoading ? (
          <>
            <ContentRowSkeleton />
            <ContentRowSkeleton />
            <ContentRowSkeleton />
          </>
        ) : (
          <>
            {searchQuery && content && content.length > 0 && (
              <ContentRow
                title={`${config.homepage.searchResultsTitle} "${searchQuery}"`}
                content={content}
                onContentClick={setSelectedContent}
                onPlayClick={handlePlayContent}
              />
            )}

            {searchQuery && content && content.length === 0 && (
              <NoResults searchQuery={searchQuery} />
            )}

            {!searchQuery && (
              <>
                {continueWatchingContent.length > 0 && (
                  <ContentRow
                    title={config.homepage.continueWatchingTitle}
                    content={continueWatchingContent as StreamingContent[]}
                    onContentClick={setSelectedContent}
                    onPlayClick={handlePlayContent}
                  />
                )}

                <ContentRow
                  title={config.homepage.trendingTitle}
                  content={trendingContent}
                  onContentClick={setSelectedContent}
                  onPlayClick={handlePlayContent}
                />

                <ContentRow
                  title={config.homepage.newReleasesTitle}
                  content={newReleasesContent}
                  onContentClick={setSelectedContent}
                  onPlayClick={handlePlayContent}
                />

                <ContentRow
                  title={config.homepage.popularTitle}
                  content={popularContent}
                  onContentClick={setSelectedContent}
                  onPlayClick={handlePlayContent}
                />
              </>
            )}
          </>
        )}
      </div>

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

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomePageContent />
    </ProtectedRoute>
  )
}
