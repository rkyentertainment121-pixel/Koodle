'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { SearchForm } from '@/components/search-form';
import { AdBanner } from '@/components/ad-banner';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">No search query provided.</h2>
        <p className="text-muted-foreground">
          Please go back and enter a search term.
        </p>
      </div>
    );
  }

  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;

  return (
    <iframe
      src={searchUrl}
      title="Search Results"
      className="h-full w-full border-none"
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between p-4 border-b">
          <Link href="/">
            <Logo />
          </Link>
          <div className="w-full max-w-2xl">
            <SearchForm />
          </div>
        </header>
        <AdBanner adKey="search-top" />
        <main className="flex-grow">
          <SearchResults />
        </main>
        <AdBanner adKey="search-bottom" />
      </div>
    </Suspense>
  );
}
