'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-blue-100 shadow-md">
      <div className="flex items-center gap-2">
        {/* TODO: ロゴ */}
        <span className="text-xl font-bold">DOLCO</span>
      </div>

      <nav className="flex items-center gap-4 text-sm">
        <Link href="/login" className="text-blue-800 font-bold hover:underline">
        ログイン
        </Link>
        <Link href="/signup" className="text-blue-800 font-bold hover:underline">
          新規登録
        </Link>
      </nav>
    </header>
  );
}
