'use client';
import s from './page.module.css';

import { auth } from '@/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginForm from '../../components/forms/LoginForm';

export default function LoginPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [loading, router, user]);

  return (
    <main className={s.login} data-testid="child">
      {!loading && !user && <LoginForm />}
    </main>
  );
}
