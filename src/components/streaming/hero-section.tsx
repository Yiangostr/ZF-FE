'use client'

import Image from 'next/image'
import { StreamingContent } from '@/types'
import { useMyList } from '@/hooks/use-my-list'
import { useMemo } from 'react'

interface HeroSectionProps {
  content: StreamingContent
  onPlay: () => void
  onMoreInfo: () => void
}

export const HeroSection = ({ content, onPlay, onMoreInfo }: HeroSectionProps) => {
  const { isInList, toggleList } = useMyList()

  const inList = useMemo(() => isInList(content.id), [content.id, isInList])

  return (
    <div className="relative w-full h-[80vh] -mt-20">
      <div className="absolute inset-0">
        {content.thumbnailUrl ? (
          <Image
            src={content.thumbnailUrl}
            alt={content.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-background-tertiary" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-background-primary via-background-primary/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-24">
        <div className="max-w-2xl space-y-4">
          <div className="inline-block px-2 py-1 bg-primary/20 backdrop-blur-sm text-xs font-semibold uppercase rounded mb-2">
            {content.type}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">{content.title}</h1>

          <div className="flex items-center gap-4 text-sm">
            {content.year && <span className="text-green-500 font-semibold">{content.year}</span>}
            {content.rating && (
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{content.rating}</span>
              </div>
            )}
            {content.duration && (
              <span>
                {Math.floor(content.duration / 60)}h {content.duration % 60}m
              </span>
            )}
          </div>

          <p className="text-base md:text-lg text-text-secondary line-clamp-3 max-w-xl">
            {content.description}
          </p>

          <div className="flex items-center gap-2 md:gap-3 pt-4">
            <button
              onClick={onPlay}
              className="flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-white text-black rounded hover:bg-white/90 transition-colors font-semibold text-sm md:text-base"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>

            <button
              onClick={onMoreInfo}
              className="flex items-center gap-2 px-4 md:px-8 py-2.5 md:py-3 bg-white/20 backdrop-blur-sm text-white rounded hover:bg-white/30 transition-colors font-semibold text-sm md:text-base"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden sm:inline">More Info</span>
              <span className="sm:hidden">Info</span>
            </button>

            <button
              onClick={() => toggleList(content.id)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/70 hover:border-white hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label={inList ? 'Remove from My List' : 'Add to My List'}
            >
              {inList ? (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
    </div>
  )
}
