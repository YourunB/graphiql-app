import s from './page.module.css';
import { metadata } from '../layout';

metadata.title = 'Login page';
metadata.description = 'Login page GraphiQl App';

export default function Home() {
  return (
    <main className={s.page}>
      Login page...
    </main>
  );
}
