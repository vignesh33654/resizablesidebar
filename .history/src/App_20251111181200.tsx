import { BatchCard } from '@/components/BatchCard';
import { useBatches } from '@/hooks/useBatches';

export default function App() {
  const { batches, loading, error } = useBatches();

  if (loading) {
    return (
      <div className="min-h-screen bg-Bg-1 flex items-center justify-center">
        <p className="text-default">Loading batches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-Bg-1 flex items-center justify-center">
        <p className="text-failure">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-Bg-1 flex items-center justify-center p-8">
      <div className="flex gap-4 flex-wrap justify-center max-w-[1200px]">
        {batches.length === 0 ? (
          <p className="text-secondary">No batches available</p>
        ) : (
          batches.map((batch) => (
            <BatchCard
              key={batch.id}
              language={batch.language}
              topic={batch.topic}
              title={batch.title}
              startDate={batch.startDate}
              timing={batch.timing}
              educators={batch.educators}
              educatorImages={batch.educatorImages}
              href={`/batch/${batch.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
