'use client';

import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="min-h-20 bg-[#204A77] flex items-center justify-between px-5">
        <span className="text-2xl text-white">Voicehere</span>
        {pathname === '/' ? (
          isLogin ? (
            <button className="text-2xl text-white" onClick={() => router.push('/history')}>
              Riwayat
            </button>
          ) : (
            <button className="text-2xl text-white" onClick={() => router.push('/login')}>
              Login
            </button>
          )
        ) : null}
      </div>
      {children}
    </div>
  );
}
