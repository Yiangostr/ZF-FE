import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWatchHistory } from '../use-watch-history'

describe('useWatchHistory', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with empty history', () => {
    const { result } = renderHook(() => useWatchHistory())
    expect(result.current.history).toEqual([])
  })

  it('should update progress for new content', () => {
    const { result } = renderHook(() => useWatchHistory())

    act(() => {
      result.current.updateProgress('content-1', 50)
    })

    expect(result.current.getProgress('content-1')).toBe(50)
  })

  it('should update existing content progress', () => {
    const { result } = renderHook(() => useWatchHistory())

    act(() => {
      result.current.updateProgress('content-1', 30)
    })

    act(() => {
      result.current.updateProgress('content-1', 60)
    })

    expect(result.current.getProgress('content-1')).toBe(60)
  })

  it('should return 0 for unwatched content', () => {
    const { result } = renderHook(() => useWatchHistory())
    expect(result.current.getProgress('unknown-id')).toBe(0)
  })

  it('should persist to localStorage', () => {
    const { result } = renderHook(() => useWatchHistory())

    act(() => {
      result.current.updateProgress('content-1', 75)
    })

    const stored = localStorage.getItem('zenithflix-watch-history')
    expect(stored).toBeTruthy()

    const parsed = JSON.parse(stored!)
    expect(parsed[0].contentId).toBe('content-1')
    expect(parsed[0].progress).toBe(75)
  })
})
