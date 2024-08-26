'use client'
import s from './GraphForm.module.css';
import checkAuth from '../utils/checkAuth';

export default function GraphForm() {
  checkAuth();

  return (
    <div className={s['graph-form']}>
      Graph form...
    </div>
  );
}
