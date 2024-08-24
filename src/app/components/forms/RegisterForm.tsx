'use client';
import s from './RegisterForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/app/utils/validation';
import Link from 'next/link';
import { registerWithEmailAndPassword } from '@/firebase';
import { RegisterData } from '@/app/type';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const submitFrom = async (data: RegisterData) => {
    try {
      await registerWithEmailAndPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={s['register__form']} onSubmit={handleSubmit(submitFrom)}>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="name" className={s['register__label']}>
              Name:
            </label>
            <input {...register('name')} type="text" className={s['register__input']} placeholder="Name" id="name" />
          </div>
          {errors.name && <div className={s.error}>{errors.name.message}</div>}
        </div>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="email" className={s['register__label']}>
              Email:
            </label>
            <input
              {...register('email')}
              type="text"
              className={s['register__input']}
              placeholder="E-mail Address"
              id="email"
            />
          </div>
          {errors.email && <div className={s.error}>{errors.email.message}</div>}
        </div>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="password" className={s['register__label']}>
              Password:
            </label>
            <input
              {...register('password')}
              type="password"
              className={s['register__input']}
              placeholder="Password"
              id="password"
            />
          </div>
          {errors.password && <div className={s.error}>{errors.password.message}</div>}
        </div>
        <div className={s['register__content']}>
          <div className={s['register__field']}>
            <label htmlFor="confirmPassword" className={s['register__label']}>
              Confirm password:
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              className={s['register__input']}
              placeholder="Confirm password"
              id="confirmPassword"
            />
          </div>
          {errors.confirmPassword && <div className={s.error}>{errors.confirmPassword.message}</div>}
        </div>

        <div className={s['register__btns']}>
          <button disabled={!isValid} className={s['register__btn']} type="submit">
            Sign Up
          </button>
        </div>
        <div className={s['register__link']}>
          Already have an account? <Link href="/login">Sign In</Link> now.
        </div>
      </form>
  )
}
