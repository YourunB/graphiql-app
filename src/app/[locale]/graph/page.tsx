import s from './page.module.css';
import GraphForm from '@/app/components/GraphForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphiQL',
  description: 'GraphiQL page',
};

export default function GraphPage() {

  return (
    <main className={s.page}>
      <h2>GraphiQL</h2>
      <GraphForm />
    </main>
  );
}
