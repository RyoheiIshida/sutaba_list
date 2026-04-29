import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-gray-900 dark:via-green-950 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-700/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center space-y-12 p-8 relative z-10 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-full blur-xl opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-full shadow-2xl shadow-green-600/40">
              <Coffee className="w-20 h-20 text-white" />
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
            スターバックス
            <br />
            店舗情報アプリ
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            スターバックスの店舗情報を管理・閲覧するアプリケーション。
            <br />
            公式情報に加えて、独自の付加情報も確認できます。
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link href="/stores">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/50 transform hover:-translate-y-1 transition-all duration-300">
              <span className="relative z-10 flex items-center">
                店舗一覧を見る
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5 5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
          <Link href="/stores/new">
            <button className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-2xl font-semibold border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:border-green-700">
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                新規店舗を登録
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}