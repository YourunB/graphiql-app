import s from './page.module.css';

import RegisterForm from '../../components/forms/RegisterForm';

export default function RegisterPage() {

  return (
    <main className={s.register} data-testid="child">
      <RegisterForm />
    </main>
  );
}
