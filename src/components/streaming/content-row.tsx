'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { StreamingContent } from '@/types'
import { ContentCard } from './content-card'
import config from '@/config/constants.json'

interface ContentRowProps {
  title: string
  content: StreamingContent[]
  onContentClick: (content: StreamingContent) => void
  onPlayClick?: (content: StreamingContent) => void
}

export const ContentRow = ({ title, content, onContentClick, onPlayClick }: ContentRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const scrollAmount = direction === 'left' ? -config.ui.scrollAmount : config.ui.scrollAmount
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }, [])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }, [])

  useEffect(() => {
    const checkScrollable = () => {
      if (!scrollRef.current) return

      const { scrollWidth, clientWidth } = scrollRef.current
      setShowRightArrow(scrollWidth > clientWidth)
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)

    return () => window.removeEventListener('resize', checkScrollable)
  }, [content])

  return (
    <div className="space-y-4 relative group">
      <h2 className="text-xl md:text-2xl font-bold px-4 md:px-8 lg:px-12">{title}</h2>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-4 z-10 w-12 bg-gradient-to-r from-background-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            aria-label={config.contentRow.scrollLeftLabel}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-12 pb-4"
        >
          {content.map((item) => (
            <ContentCard
              key={item.id}
              content={item}
              onClick={() => onContentClick(item)}
              {...(onPlayClick && { onPlay: () => onPlayClick(item) })}
            />
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-4 z-10 w-12 bg-gradient-to-l from-background-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            aria-label={config.contentRow.scrollRightLabel}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
