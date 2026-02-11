export default function LocationListSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      <div className="h-5 w-24 bg-skeleton rounded animate-pulse" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border-card">
          <div className="w-20 h-20 bg-skeleton rounded-lg animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-skeleton rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-skeleton rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-skeleton rounded animate-pulse" />
          </div>
          <div className="w-16 h-5 bg-skeleton rounded-lg animate-pulse shrink-0" />
        </div>
      ))}
    </div>
  );
}
