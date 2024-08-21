'use client';
import s from './page.module.css';
import { auth } from '@/firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import RegisterForm from '../components/forms/RegisterForm';

export default function RegisterPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
 
  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  return (
    <main className={s.register} data-testid="child">
      {!loading && !user && <RegisterForm/>}
    </main>
  );
}
