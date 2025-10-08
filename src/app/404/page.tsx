'use client'

import Link from 'next/link'
import config from '@/config/constants.json'

export default function Custom404Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary">{config.notFoundPage.title}</h1>
          <h2 className="text-3xl md:text-4xl font-bold">{config.notFoundPage.heading}</h2>
          <p className="text-lg text-text-secondary">{config.notFoundPage.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={config.routes.home}
            className="px-8 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            {config.notFoundPage.homeButton}
          </Link>
          <Link
            href={config.routes.trending}
            className="px-8 py-3 bg-background-secondary text-white rounded-md font-semibold hover:bg-background-tertiary transition-colors border border-text-secondary/20"
          >
            {config.notFoundPage.trendingButton}
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-text-muted">{config.notFoundPage.helpText}</p>
        </div>
      </div>
    </div>
  )
}
