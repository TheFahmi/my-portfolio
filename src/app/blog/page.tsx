'use client';

import PageTransition from '@/components/effects/PageTransition';

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <p className="text-gray-400">Coming soon...</p>
        </div>
      </main>
    </PageTransition>
  );
}
