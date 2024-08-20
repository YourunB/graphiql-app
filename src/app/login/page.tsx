import s from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login page',
  description: 'Login page GraphiQl App',
};

export default function PageLogin() {
  return (
    <main className={s.page} data-testid="child">
      Login page...
    </main>
  );
}
