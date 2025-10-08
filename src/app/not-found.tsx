import Link from 'next/link'
import config from '@/config/constants.json'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary">{config.notFoundPage.title}</h1>
          <h2 className="text-3xl font-semibold">{config.notFoundPage.heading}</h2>
          <p className="text-text-secondary text-lg">{config.notFoundPage.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={config.routes.home}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {config.notFoundPage.homeButton}
          </Link>
          <Link
            href={config.routes.trending}
            className="px-8 py-3 border-2 border-text-secondary text-text-primary rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            {config.notFoundPage.trendingButton}
          </Link>
        </div>

        <div className="pt-8">
          <svg
            className="w-64 h-64 mx-auto opacity-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
