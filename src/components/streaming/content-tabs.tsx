'use client'

import config from '@/config/constants.json'

interface ContentTabsProps {
  activeTab: 'all' | 'movie' | 'series'
  onTabChange: (tab: 'all' | 'movie' | 'series') => void
}

export const ContentTabs = ({ activeTab, onTabChange }: ContentTabsProps) => {
  return (
    <div className="px-4 md:px-8 lg:px-12">
      <div className="flex gap-4 border-b border-text-secondary/20">
        <button
          onClick={() => onTabChange('all')}
          className={`px-4 py-2 font-semibold transition-colors relative ${
            activeTab === 'all' ? 'text-white' : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {config.homepage.tabAll}
          {activeTab === 'all' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />
          )}
        </button>
        <button
          onClick={() => onTabChange('movie')}
          className={`px-4 py-2 font-semibold transition-colors relative ${
            activeTab === 'movie' ? 'text-white' : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {config.homepage.tabMovies}
          {activeTab === 'movie' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />
          )}
        </button>
        <button
          onClick={() => onTabChange('series')}
          className={`px-4 py-2 font-semibold transition-colors relative ${
            activeTab === 'series' ? 'text-white' : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {config.homepage.tabSeries}
          {activeTab === 'series' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />
          )}
        </button>
      </div>
    </div>
  )
}
