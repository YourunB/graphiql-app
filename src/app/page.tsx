import s from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home page',
  description: 'Home page GraphiQl App',
};

export default function PageHome() {
  return <main className={s.page}>Home page...</main>;
}
