'use client'

import config from '@/config/constants.json'

interface NoResultsProps {
  searchQuery: string
}

export const NoResults = ({ searchQuery }: NoResultsProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {config.noResults.title.replace('{query}', searchQuery)}
        </h2>
        <div className="space-y-4 text-left">
          <p className="font-semibold">{config.noResults.suggestions}</p>
          <ul className="space-y-2 text-text-secondary">
            <li>• {config.noResults.suggestion1}</li>
            <li>• {config.noResults.suggestion2}</li>
            <li>• {config.noResults.suggestion3}</li>
            <li>• {config.noResults.suggestion4}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
