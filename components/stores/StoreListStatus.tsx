import { Coffee, Search, AlertCircle } from 'lucide-react';

interface StoreListStatusProps {
  loading: boolean;
  error: string | null;
  storesCount: number;
}

export function StoreListStatus({ loading, error, storesCount }: StoreListStatusProps) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-full blur-xl opacity-75 animate-pulse"></div>
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600"></div>
          </div>
        </div>
        <p className="mt-6 text-gray-600 dark:text-gray-300 font-medium">店舗情報を読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg">
        <AlertCircle className="w-6 h-6 flex-shrink-0" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (storesCount === 0) {
    return (
      <div className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full blur-xl opacity-50"></div>
            <Coffee className="w-20 h-20 text-gray-400 relative" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">店舗が見つかりませんでした</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          検索条件を変更するか、新しい店舗を登録してみてください
        </p>
      </div>
    );
  }

  return null;
}