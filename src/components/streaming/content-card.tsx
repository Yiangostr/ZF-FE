'use client'

import Image from 'next/image'
import { StreamingContent } from '@/types'
import { useWatchHistory } from '@/features/streaming/hooks/use-watch-history'
import { useMyList } from '@/hooks/use-my-list'
import { useMemo } from 'react'
import config from '@/config/constants.json'

interface ContentCardProps {
  content: StreamingContent
  onClick: () => void
  onPlay?: () => void
}

export const ContentCard = ({ content, onClick, onPlay }: ContentCardProps) => {
  const { getProgress } = useWatchHistory()
  const { isInList, toggleList } = useMyList()

  const progress = useMemo(() => getProgress(content.id), [content.id, getProgress])

  const inList = useMemo(() => isInList(content.id), [content.id, isInList])

  return (
    <div
      className="group/card cursor-pointer flex-none w-64 transition-transform duration-300 hover:scale-105 hover:z-10"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${config.contentCard.viewDetailsLabel} ${content.title}`}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-background-tertiary">
        <div className="absolute top-2 left-2 z-10">
          <span className="px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-[10px] font-bold uppercase rounded text-text-muted">
            {content.type}
          </span>
        </div>

        {content.thumbnailUrl ? (
          <Image
            src={content.thumbnailUrl}
            alt={content.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover/card:opacity-80"
            sizes="256px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            {config.contentCard.noImage}
          </div>
        )}

        {progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/80">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
              aria-label={`${Math.round(progress)}% ${config.contentCard.watchedLabel}`}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                if (onPlay) onPlay()
              }}
              aria-label={config.contentCard.playLabel}
            >
              <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <button
              className="w-8 h-8 rounded-full border-2 border-white/70 hover:border-white hover:bg-white/20 flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                toggleList(content.id)
              }}
              aria-label={
                inList ? config.contentCard.removeFromListLabel : config.contentCard.addToListLabel
              }
            >
              {inList ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="font-semibold text-sm truncate group-hover/card:text-primary transition-colors">
          {content.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          {content.year && <span>{content.year}</span>}
          {content.rating && (
            <>
              <span>•</span>
              {content.imdbId ? (
                <a
                  href={`https://www.imdb.com/title/${content.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {content.rating}
                </a>
              ) : (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {content.rating}
                </span>
              )}
            </>
          )}
          {content.duration && (
            <>
              <span>•</span>
              <span>
                {Math.floor(content.duration / 60)}h {content.duration % 60}m
              </span>
            </>
          )}
        </div>
        {content.genre && content.genre.length > 0 && (
          <p className="text-xs text-text-muted truncate">{content.genre.join(', ')}</p>
        )}
      </div>
    </div>
  )
}
