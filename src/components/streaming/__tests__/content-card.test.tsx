import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContentCard } from '../content-card'
import { StreamingContent } from '@/types'

vi.mock('@/features/streaming/hooks/use-watch-history', () => ({
  useWatchHistory: () => ({
    getProgress: () => 0,
  }),
}))

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

describe('ContentCard', () => {
  const mockContent: StreamingContent = {
    id: '1',
    title: 'Test Movie',
    description: 'Test description',
    thumbnailUrl: 'https://example.com/image.jpg',
    year: 2024,
    genre: ['Action', 'Drama'],
    rating: 8.5,
    duration: 120,
    cast: ['Actor 1', 'Actor 2'],
    createdAt: new Date(),
  }

  const mockOnClick = vi.fn()

  it('should render content title', () => {
    render(<ContentCard content={mockContent} onClick={mockOnClick} />)
    expect(screen.getByText('Test Movie')).toBeDefined()
  })

  it('should display year and rating', () => {
    render(<ContentCard content={mockContent} onClick={mockOnClick} />)
    expect(screen.getByText('2024')).toBeDefined()
    expect(screen.getByText('8.5')).toBeDefined()
  })

  it('should display duration', () => {
    render(<ContentCard content={mockContent} onClick={mockOnClick} />)
    expect(screen.getByText(/2h 0m/)).toBeDefined()
  })

  it('should display genres', () => {
    render(<ContentCard content={mockContent} onClick={mockOnClick} />)
    expect(screen.getByText('Action, Drama')).toBeDefined()
  })

  it('should have proper accessibility attributes', () => {
    render(<ContentCard content={mockContent} onClick={mockOnClick} />)
    const card = screen.getByRole('button', { name: /View details for Test Movie/ })
    expect(card).toBeDefined()
  })
})
