'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateStoreInput } from '@/lib/types/store';
import { StoreForm } from '@/components/stores/StoreForm';
import { Coffee } from 'lucide-react';

export default function NewStorePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateStoreInput) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '店舗の作成に失敗しました');
      }

      const result = await response.json();
      router.push(`/stores/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      setIsSubmitting(false);
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Coffee className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            新規店舗を登録
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <StoreForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
