'use client';
import s from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/app/utils/validation';
import Link from 'next/link';
import { logInWithEmailAndPassword } from '@/firebase';
import { LoginData } from '@/app/type';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { t } = useTranslation();
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
            {t('fields.email.name')}:
          </label>
          <input
            {...register('email')}
            type="text"
            className={s['login__input']}
            placeholder={t('fields.email.placeholder')}
            id="email"
          />
        </div>
        {errors.email && <div className={s.error}>{errors.email.message}</div>}
      </div>
      <div className={s['login__content']}>
        <div className={s['login__field']}>
          <label htmlFor="password" className={s['login__label']}>
            {t('fields.password.name')}:
          </label>
          <input
            {...register('password')}
            type="password"
            className={s['login__input']}
            placeholder={t('fields.password.placeholder')}
            id="password"
          />
        </div>
        {errors.password && <div className={s.error}>{errors.password.message}</div>}
      </div>

      <div className={s['login__btns']}>
        <button disabled={!isValid} className={s['login__btn']} type="submit">
          {t('login')}:
        </button>
      </div>
      <div className={s['login__link']}>
        {t('doNotHaveAccount')}? <Link href="/register">{t('register')}</Link>
        {t('now')}.
      </div>
    </form>
  );
}
