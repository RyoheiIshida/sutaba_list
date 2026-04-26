import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8 p-8">
        <div className="flex justify-center">
          <div className="bg-green-600 p-6 rounded-full">
            <Coffee className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          スターバックス店舗情報アプリ
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          スターバックスの店舗情報を管理・閲覧するアプリケーション。
          公式情報に加えて、独自の付加情報も確認できます。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/stores"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            店舗一覧を見る
          </Link>
          <Link
            href="/stores/new"
            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors border border-gray-300"
          >
            新規店舗を登録
          </Link>
        </div>
      </div>
    </div>
  );
}
