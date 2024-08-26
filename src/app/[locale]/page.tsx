import s from './page.module.css';
import AboutTeam from "../components/AboutTeam";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Home page GraphiQl App',
};

export default function PageHome() {

  return (
    <main className={s.page}>
      <AboutTeam />
    </main>
  );
}
