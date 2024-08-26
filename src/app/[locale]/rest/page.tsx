'use client';
import s from './page.module.css';

import { auth } from '@/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function RestPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push('/');
  }, [loading, router, user]);

  return (
    <main className={s.page}>
      Rest page...
    </main>
  );
}
