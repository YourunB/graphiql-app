import { metadata } from './layout';
import s from './page.module.css';

metadata.title = 'Home page';
metadata.description = 'Home page GraphiQl App';

export default function Home() {
  return (
    <main className={s.page}>
      Home page...
    </main>
  );
}
