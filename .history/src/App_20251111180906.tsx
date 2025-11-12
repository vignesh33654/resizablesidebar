import { BatchCard } from '@/components/BatchCard';

export default function App() {
  return (
    <div className="min-h-screen bg-Bg-1 flex items-center justify-center p-8">
      <div className="flex gap-4 flex-wrap justify-center max-w-[1200px]">
        
        <BatchCard
          language="En"
          topic="FULL SYLLABUS COMPLETION"
          title="Samarth Batch for NEET 2022 for Droppers & Class 12th"
          startDate="Starts in 3 days · 12 Mar, 2021"
          timing="Early morning classes"
          educators="Educator name one, Educator name two, Educator name three"
          href="#"
        />

      </div>
    </div>
  );
}
