'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AdBanner } from '@/components/ad-banner';
import { GeometricBackground } from '@/components/common/geometric-background';
import { Logo } from '@/components/logo';
import { SearchForm } from '@/components/search-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  if (!query) {
    return (
      <div className="text-center">
        <p>Please enter a search query.</p>
      </div>
    );
  }

  const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(
    query
  )}`;

  return (
    <div className="w-full h-[80vh] border-t border-b border-gray-200">
      <iframe src={bingSearchUrl} className="w-full h-full border-0" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="relative min-h-screen w-full">
        <GeometricBackground />
        <div className="flex flex-col min-h-screen">
          <header className="p-6 md:p-8 flex justify-between items-center">
            <Link href="/">
              <Logo />
            </Link>
          </header>

          <AdBanner />

          <main className="relative z-10 flex flex-col items-center justify-center gap-6 p-4 text-center">
            <SearchForm />
            <div className="w-full max-w-6xl mt-6">
              <SearchResults />
            </div>
          </main>

          <AdBanner />
        </div>
      </div>
    </Suspense>
  );
}
