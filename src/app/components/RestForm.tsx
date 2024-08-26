'use client'
import s from './GraphForm.module.css';
import checkAuth from '../utils/checkAuth';

export default function RestForm() {
  checkAuth();

  return (
    <div className={s['rest-form']}>
      Rest form...
    </div>
  );
}
