import { useQuery } from '@tanstack/react-query'
import { streamingApi } from '../api'

export const useStreamingContent = (search?: string) => {
  return useQuery({
    queryKey: ['streaming-content', search],
    queryFn: ({ signal }) => streamingApi.fetchAll(signal, search),
  })
}

export const useContentById = (id: string) => {
  return useQuery({
    queryKey: ['streaming-content', id],
    queryFn: ({ signal }) => streamingApi.fetchById(id, signal),
    enabled: !!id,
  })
}
