'use client'

import Image from 'next/image'
import { StreamingContent } from '@/types'
import { Modal } from '@/components/ui/modal'
import { useWatchHistory } from '@/features/streaming/hooks/use-watch-history'
import { useMyList } from '@/hooks/use-my-list'
import { useMemo } from 'react'
import config from '@/config/constants.json'

interface ContentModalProps {
  content: StreamingContent | null
  isOpen: boolean
  onClose: () => void
  onPlay?: (content: StreamingContent) => void
}

export const ContentModal = ({ content, isOpen, onClose, onPlay }: ContentModalProps) => {
  const { getProgress } = useWatchHistory()
  const { isInList, toggleList } = useMyList()

  const progress = useMemo(() => (content ? getProgress(content.id) : 0), [content, getProgress])

  const inList = useMemo(() => (content ? isInList(content.id) : false), [content, isInList])

  if (!content) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={content.title}>
      <div className="space-y-6">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-background-tertiary">
          {content.thumbnailUrl ? (
            <Image
              src={content.thumbnailUrl}
              alt={`${content.title} thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-text-muted"
              role="img"
              aria-label="No thumbnail available"
            >
              No Image Available
            </div>
          )}

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" id="content-title">
              {content.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (onPlay) {
                    onPlay(content)
                    onClose()
                  }
                }}
                className="px-8 py-3 bg-white text-black rounded-md font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
                aria-label={`${config.modal.playButton} ${content.title}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {config.modal.playButton}
              </button>

              <button
                onClick={() => toggleList(content.id)}
                className="w-12 h-12 rounded-full border-2 border-white/50 hover:border-white flex items-center justify-center transition-colors"
                aria-label={
                  inList ? config.modal.removeFromListButton : config.modal.addToListButton
                }
              >
                {inList ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div
              className="flex items-center gap-4 text-sm"
              role="list"
              aria-label="Content metadata"
            >
              {content.rating && (
                <span
                  className="text-green-500 font-semibold"
                  role="listitem"
                  aria-label={`Rating: ${content.rating} out of 10`}
                >
                  {(content.rating * 10).toFixed(0)}% Match
                </span>
              )}
              {content.year && (
                <span
                  className="text-text-secondary"
                  role="listitem"
                  aria-label={`Release year: ${content.year}`}
                >
                  {content.year}
                </span>
              )}
              {content.duration && (
                <span
                  className="text-text-secondary"
                  role="listitem"
                  aria-label={`Duration: ${Math.floor(content.duration / 60)} hours ${
                    content.duration % 60
                  } minutes`}
                >
                  {Math.floor(content.duration / 60)}h {content.duration % 60}m
                </span>
              )}
            </div>

            {content.description && (
              <p className="text-text-secondary leading-relaxed" aria-label="Content description">
                {content.description}
              </p>
            )}

            {progress > 0 && (
              <div className="space-y-2" role="region" aria-label="Watch progress">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Watch Progress</span>
                  <span className="text-text-primary font-medium">{progress}%</span>
                </div>
                <div
                  className="h-2 bg-background-tertiary rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${progress}% watched`}
                >
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 text-sm">
            {content.cast && content.cast.length > 0 && (
              <div>
                <span className="text-text-muted">Cast: </span>
                <span className="text-text-secondary">{content.cast.slice(0, 3).join(', ')}</span>
              </div>
            )}

            {content.genre && content.genre.length > 0 && (
              <div>
                <span className="text-text-muted">Genres: </span>
                <span className="text-text-secondary">{content.genre.join(', ')}</span>
              </div>
            )}

            {content.rating && (
              <div>
                <span className="text-text-muted">Rating: </span>
                <span className="text-text-secondary flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {content.rating}/10
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
