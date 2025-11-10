'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-screen">
        <h2 className="text-2xl font-bold">No search query provided.</h2>
        <p className="text-muted-foreground">
          Please go back and enter a search term.
        </p>
      </div>
    );
  }

  // The &igu=1 parameter is added to keep Google in the iframe.
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}&igu=1`;

  return (
    <iframe
      src={searchUrl}
      title="Search Results"
      className="h-full w-full border-none"
      sandbox="allow-scripts allow-forms allow-same-origin"
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
        <main className="flex-grow h-full">
          <SearchResults />
        </main>
      </div>
    </Suspense>
  );
}
