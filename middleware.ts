import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 管理者用ページの保護（クライアントサイドでチェックするため、ここではリダイレクトのみ）
  if (pathname.startsWith('/stores/new') || pathname.match(/^\/stores\/\d+\/edit$/)) {
    // 認証チェックはクライアントサイドで行うため、ここでは何もしない
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/stores/new',
    '/stores/:id/edit',
  ],
};
