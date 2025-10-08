export const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse bg-background-tertiary rounded ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

export const ContentCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full aspect-video" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}

export const ContentRowSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-none w-64">
            <ContentCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

export const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-[80vh] -mt-20 bg-background-tertiary">
      <div className="absolute inset-0 bg-gradient-to-r from-background-primary via-background-primary/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-24">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-6 w-16 mb-2" />
          <Skeleton className="h-16 md:h-20 w-full max-w-lg" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-full max-w-xl" />
            <Skeleton className="h-6 w-full max-w-md" />
            <Skeleton className="h-6 w-3/4 max-w-lg" />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
