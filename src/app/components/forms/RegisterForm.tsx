'use client';
import s from './RegisterForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/app/utils/validation';
import Link from 'next/link';
import { registerWithEmailAndPassword } from '@/firebase';
import { RegisterData } from '@/app/type';
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
  const { t } = useTranslation();
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
            {t('fields.name.name')}:
          </label>
          <input
            {...register('name')}
            type="text"
            className={s['register__input']}
            placeholder={t('fields.name.placeholder')}
            id="name"
          />
        </div>
        {errors.name && <div className={s.error}>{errors.name.message}</div>}
      </div>
      <div className={s['register__content']}>
        <div className={s['register__field']}>
          <label htmlFor="email" className={s['register__label']}>
            {t('fields.email.name')}:
          </label>
          <input
            {...register('email')}
            type="text"
            className={s['register__input']}
            placeholder={t('fields.email.placeholder')}
            id="email"
          />
        </div>
        {errors.email && <div className={s.error}>{errors.email.message}</div>}
      </div>
      <div className={s['register__content']}>
        <div className={s['register__field']}>
          <label htmlFor="password" className={s['register__label']}>
            {t('fields.password.name')}:
          </label>
          <input
            {...register('password')}
            type="password"
            className={s['register__input']}
            placeholder={t('fields.password.placeholder')}
            id="password"
          />
        </div>
        {errors.password && <div className={s.error}>{errors.password.message}</div>}
      </div>
      <div className={s['register__content']}>
        <div className={s['register__field']}>
          <label htmlFor="confirmPassword" className={s['register__label']}>
            {t('fields.confirmPassword.name')}:
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            className={s['register__input']}
            placeholder={t('fields.confirmPassword.placeholder')}
            id="confirmPassword"
          />
        </div>
        {errors.confirmPassword && <div className={s.error}>{errors.confirmPassword.message}</div>}
      </div>

      <div className={s['register__btns']}>
        <button disabled={!isValid} className={s['register__btn']} type="submit">
          {t('register')}
        </button>
      </div>
      <div className={s['register__link']}>
        {t('alreadyHaveAccount')}? <Link href="/login">{t('login')}</Link>
        {t('now')}.
      </div>
    </form>
  );
}
