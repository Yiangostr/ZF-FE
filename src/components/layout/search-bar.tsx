'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useStreamingContent } from '@/features/streaming/hooks/use-streaming-content'
import config from '@/config/constants.json'

export const SearchBar = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const { data: searchResults } = useStreamingContent(
    searchQuery.length > config.search.minQueryLength ? searchQuery : undefined
  )

  const showResults = useMemo(
    () =>
      searchQuery.length > config.search.minQueryLength &&
      !!searchResults &&
      searchResults.length > 0,
    [searchQuery, searchResults]
  )

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div ref={searchRef} className="relative">
      <div
        className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-80' : 'w-10'}`}
      >
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && handleSearch()}
          placeholder={config.search.placeholder}
          className={`absolute right-0 h-10 bg-background-secondary border border-text-secondary/30 rounded px-4 pr-12 text-sm outline-none focus:border-primary transition-all duration-300 ${
            searchOpen ? 'opacity-100 w-80' : 'opacity-0 w-0'
          }`}
        />
        <button
          type="button"
          onClick={() => (searchOpen && searchQuery.trim() ? handleSearch() : setSearchOpen(true))}
          aria-label={config.search.searchLabel}
          className="absolute right-0 p-2 text-text-primary hover:text-text-secondary transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {searchOpen && showResults && (
        <div className="absolute right-0 top-12 w-96 bg-background-secondary border border-text-secondary/20 rounded-lg shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {searchResults?.slice(0, config.search.maxResults).map((item) => (
              <a
                key={item.id}
                href={`/?search=${encodeURIComponent(item.title)}`}
                className="flex items-center gap-3 p-3 hover:bg-background-tertiary rounded-lg transition-colors"
              >
                <div className="w-16 h-10 bg-background-tertiary rounded overflow-hidden flex-shrink-0 relative">
                  {item.thumbnailUrl && (
                    <div
                      style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
                      className="w-full h-full bg-cover bg-center"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="uppercase">{item.type}</span>
                    {item.year && (
                      <>
                        <span>•</span>
                        <span>{item.year}</span>
                      </>
                    )}
                  </div>
                </div>
              </a>
            ))}
            {searchResults && searchResults.length > config.search.maxResults && (
              <button
                onClick={handleSearch}
                className="w-full px-4 py-3 text-sm text-text-secondary hover:text-white transition-colors text-center"
              >
                {config.search.viewAllResults} {searchResults.length} {config.search.resultsLabel}
              </button>
            )}
          </div>
        </div>
      )}

      {searchOpen && searchQuery.length > 0 && !showResults && (
        <div className="absolute right-0 top-12 w-96 bg-background-secondary border border-text-secondary/20 rounded-lg shadow-2xl overflow-hidden z-50">
          <div className="p-4">
            <p className="text-sm text-text-muted mb-3">
              {config.search.enterPrompt} &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
