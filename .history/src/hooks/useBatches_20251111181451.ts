import { useState, useEffect } from 'react';

export interface BatchData {
  id: string;
  language: string;
  topic: string;
  title: string;
  startDate: string;
  timing: string;
  educators: string;
  educatorImages?: string[];
}

const DUMMY_BATCHES: BatchData[] = [
  {
    id: '1',
    language: 'En',
    topic: 'FULL SYLLABUS COMPLETION',
    title: 'Samarth Batch for NEET 2022 for Droppers & Class 12th',
    startDate: 'Starts in 3 days · 12 Mar, 2021',
    timing: 'Early morning classes',
    educators: 'Educator name one, Educator name two, Educator name three',
  },
  {
    id: '2',
    language: 'Hi',
    topic: 'CRASH COURSE',
    title: 'JEE Advanced 2022 Crash Course Batch',
    startDate: 'Starts in 1 week · 20 Mar, 2021',
    timing: 'Evening classes',
    educators: 'Dr. Sharma, Prof. Patel',
  },
  {
    id: '3',
    language: 'En',
    topic: 'FOUNDATION COURSE',
    title: 'Foundation Course for Class 11th Students',
    startDate: 'Starts tomorrow · 15 Mar, 2021',
    timing: 'Flexible timings',
    educators: 'Expert faculty team',
  },
  {
    id: '4',
    language: 'En',
    topic: 'LIVE CLASSES',
    title: 'Physics Masterclass for JEE Main 2022',
    startDate: 'Ongoing · Started 5 Mar, 2021',
    timing: 'Morning and evening batches',
    educators: 'Prof. Kumar, Dr. Singh, Prof. Verma',
  },
  {
    id: '5',
    language: 'Hi',
    topic: 'TEST SERIES',
    title: 'NEET Mock Test Series with Detailed Analysis',
    startDate: 'Starts next month · 1 Apr, 2021',
    timing: 'Weekly tests',
    educators: 'Dr. Gupta, Dr. Mehta',
  },
  {
    id: '6',
    language: 'En',
    topic: 'DOUBT CLEARING',
    title: 'Chemistry Doubt Clearing Sessions for NEET',
    startDate: 'Starts today · 10 Mar, 2021',
    timing: 'Late evening sessions',
    educators: 'Prof. Reddy, Dr. Nair',
  },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api.com/api';
const USE_DUMMY_DATA = true; // Set to false when you have a real API

export function useBatches() {
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBatches() {
      try {
        setLoading(true);
        
        if (USE_DUMMY_DATA) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 800));
          setBatches(DUMMY_BATCHES);
          setError(null);
        } else {
          const response = await fetch(`${API_BASE_URL}/batches`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch batches: ${response.statusText}`);
          }
          
          const data = await response.json();
          setBatches(data);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error fetching batches:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBatches();
  }, []);

  return { batches, loading, error };
}

export function useBatch(id: string) {
  const [batch, setBatch] = useState<BatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBatch() {
      try {
        setLoading(true);
        
        if (USE_DUMMY_DATA) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          const foundBatch = DUMMY_BATCHES.find(b => b.id === id);
          setBatch(foundBatch || null);
          setError(foundBatch ? null : new Error('Batch not found'));
        } else {
          const response = await fetch(`${API_BASE_URL}/batches/${id}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch batch: ${response.statusText}`);
          }
          
          const data = await response.json();
          setBatch(data);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error fetching batch:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBatch();
    }
  }, [id]);

  return { batch, loading, error };
}
