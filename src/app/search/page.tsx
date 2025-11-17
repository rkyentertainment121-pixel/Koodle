'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { AdBanner } from '@/components/ad-banner';
import { GeometricBackground } from '@/components/common/geometric-background';
import { Rewards } from '@/components/rewards';
import { SearchForm } from '@/components/search-form';
import { Logo } from '@/components/logo';

// Mock search results API
const fakeSearchResults = (query: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (_, i) => ({
          title: `Result ${i + 1} for "${query}"`,
          link: `https://example.com/search?q=${encodeURIComponent(query)}&result=${i + 1}`,
          snippet: `This is a snippet for result ${i + 1}. It contains some descriptive text about the search result, which is related to the query: ${query}.`,
        }))
      );
    }, 1000);
  });

type SearchResult = {
  title: string;
  link: string;
  snippet: string;
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fakeSearchResults(query).then((res) => {
        setResults(res as SearchResult[]);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-border/20 shadow-sm">
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-primary hover:underline"
              >
                {result.title}
              </a>
              <p className="text-sm text-green-700 dark:text-green-400 break-all">{result.link}</p>
              <p className="text-muted-foreground mt-1">{result.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
      <div className="relative min-h-screen w-full">
        <GeometricBackground />
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 md:px-6">
              <Link href="/">
                <Logo />
              </Link>
              <div className="flex-1 max-w-2xl px-4">
                <SearchForm />
              </div>
              <Rewards />
            </div>
          </header>

          <main className="relative z-10 flex-grow py-8">
            <SearchResults />
          </main>

          <AdBanner adKey="search-bottom" />
        </div>
      </div>
    </Suspense>
  );
}
