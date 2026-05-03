import { SignInForm } from '@/components/auth/SignInForm';
import { Coffee } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* ヘッダー */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/30 mb-4">
            <Coffee className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            スタバ店舗リスト
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            管理者ログイン
          </p>
        </div>

        {/* ログインフォーム */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <SignInForm />
        </div>

        {/* フッター */}
        <p className="text-center text-xs text-gray-500">
          © 2026 スタバ店舗リスト. All rights reserved.
        </p>
      </div>
    </div>
  );
}
