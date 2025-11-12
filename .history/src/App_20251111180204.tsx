import {
  BatchCard,
  BatchCardWrapper,
  BatchCardImage,
  BatchCardContent,
  BatchCardHeader,
  BatchCardTitle,
  BatchCardMeta,
  BatchCardMetaItem,
} from '@/components/BatchCard';

export default function App() {
  return (
    <div className="min-h-screen bg-Bg-1 flex items-center justify-center p-8">
      <div className="flex gap-4 flex-wrap justify-center max-w-[1200px]">
        
        <BatchCardWrapper href="#" aria-label="View NEET 2022 batch">
          <BatchCard>
            <BatchCardImage alt="Educators for NEET 2022" />
            <BatchCardContent>
              <BatchCardHeader 
                language="En" 
                topic="FULL SYLLABUS COMPLETION" 
              />
              <BatchCardMeta>
                <BatchCardTitle>
                  Samarth Batch for NEET 2022 for Droppers & Class 12th
                </BatchCardTitle>
                <BatchCardMetaItem>
                  Starts in 3 days · 12 Mar, 2021
                </BatchCardMetaItem>
                <BatchCardMetaItem>
                  Early morning classes
                </BatchCardMetaItem>
                <BatchCardMetaItem>
                  Educator name one, Educator name two, Educator name three
                </BatchCardMetaItem>
              </BatchCardMeta>
            </BatchCardContent>
          </BatchCard>
        </BatchCardWrapper>

        <BatchCardWrapper 
          onClick={() => console.log('Batch clicked')}
          aria-label="View JEE Advanced 2022 batch"
        >
          <BatchCard size="compact">
            <BatchCardImage alt="Educators for JEE Advanced" />
            <BatchCardContent>
              <BatchCardHeader 
                language="Hi" 
                topic="CRASH COURSE" 
              />
              </BatchCardContent>
            </BatchCard>
          </BatchCardWrapper>
            </div>
  );
}

export default App;
