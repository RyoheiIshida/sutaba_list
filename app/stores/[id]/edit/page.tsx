'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Store, CreateStoreInput } from '@/lib/types/store';
import { StoreForm } from '@/components/stores/StoreForm';
import { Coffee } from 'lucide-react';

export default function EditStorePage() {
  const params = useParams();
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stores/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('店舗が見つかりません');
        }
        throw new Error('店舗情報の取得に失敗しました');
      }

      const data = await response.json();
      setStore(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchStore();
    }
  }, [params.id]);

  const handleSubmit = async (data: CreateStoreInput) => {
    if (!store) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`/api/stores/${store.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '店舗の更新に失敗しました');
      }

      router.push(`/stores/${store.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      setIsSubmitting(false);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Coffee className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error || '店舗が見つかりません'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Coffee className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            店舗情報を編集
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <StoreForm store={store} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
