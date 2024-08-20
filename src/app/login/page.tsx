import s from './page.module.css';
import { metadata } from '../layout';

metadata.title = 'Login page';
metadata.description = 'Login page GraphiQl App';

export default function PageLogin() {
  return (
    <main className={s.page} data-testid="child">
      Login page...
    </main>
  );
}
