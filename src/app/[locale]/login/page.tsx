import s from './page.module.css';

import LoginForm from '../../components/forms/LoginForm';

export default function LoginPage() {

  return (
    <main className={s.login} data-testid="child">
      <LoginForm />
    </main>
  );
}
