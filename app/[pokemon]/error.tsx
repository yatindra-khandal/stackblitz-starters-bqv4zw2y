'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error fetching Pokémon details:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold text-red-500">
        Oops! Something went wrong.
      </h1>
      <p className="mt-2">Failed to load Pokémon details. Please try again.</p>
      <div className="mt-4">
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
        <Link href="/">
          <button className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
