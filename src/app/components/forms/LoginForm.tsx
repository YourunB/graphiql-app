'use client';
import s from './LoginForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/app/utils/validation';
import Link from 'next/link';
import { logInWithEmailAndPassword } from '@/firebase';
import { LoginData } from '@/app/type';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const submitFrom = async (data: LoginData) => {
    try {
      await logInWithEmailAndPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={s['login__form']} onSubmit={handleSubmit(submitFrom)}>
        <div className={s['login__content']}>
          <div className={s['login__field']}>
            <label htmlFor="email" className={s['login__label']}>
              Email:
            </label>
            <input
              {...register('email')}
              type="text"
              className={s['login__input']}
              placeholder="E-mail Address"
              id="email"
            />
          </div>
          {errors.email && <div className={s.error}>{errors.email.message}</div>}
        </div>
        <div className={s['login__content']}>
          <div className={s['login__field']}>
            <label htmlFor="password" className={s['login__label']}>
              Password:
            </label>
            <input
              {...register('password')}
              type="password"
              className={s['login__input']}
              placeholder="Password"
              id="password"
            />
          </div>
          {errors.password && <div className={s.error}>{errors.password.message}</div>}
        </div>

        <div className={s['login__btns']}>
          <button disabled={!isValid} className={s['login__btn']} type="submit">
            Login
          </button>
        </div>
        <div className={s['login__link']}>
          Don&apos;t have an account? <Link href="/register">Register</Link> now.
        </div>
      </form>
  )
}
