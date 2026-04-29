'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Store, CreateStoreInput } from '@/lib/types/store';
import { StoreDetail } from '@/components/stores/StoreDetail';
import { Button } from '@/components/ui/Button';
import { Coffee } from 'lucide-react';

export default function StoreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDelete = async () => {
    if (!store) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/stores/${store.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('店舗の削除に失敗しました');
      }

      router.push('/stores');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-green-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-green-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Coffee className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error || '店舗が見つかりません'}</p>
          <Button variant="primary" onClick={() => router.push('/stores')}>
            一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-green-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StoreDetail
          store={store}
          onDelete={() => setShowDeleteConfirm(true)}
          isDeleting={isDeleting}
        />

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                店舗を削除しますか？
              </h3>
              <p className="text-gray-600 mb-6">
                この操作は取り消せません。本当に削除しますか？
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  キャンセル
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? '削除中...' : '削除'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
