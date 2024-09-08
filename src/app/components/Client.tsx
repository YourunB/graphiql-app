'use client';
import s from './Client.module.css';

import GraphForm from './GraphForm';
import RestForm from './RestForm';
import { usePathname, useRouter } from 'next/navigation';

const Client = () => {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');

  let codeForm;
  if (parts.length > 1 && (parts[1].toLowerCase() === 'rest' || parts[1].toLowerCase() === 'get' || parts[1].toLowerCase() === 'post' || parts[2].toLowerCase() === 'rest' || parts[2].toLowerCase() === 'get' || parts[2].toLowerCase() === 'post')) {
    codeForm = <>
      <h2 className={s['title']}>REST</h2>
      <RestForm />
    </>
  } else if (parts.length > 1 && (parts[1].toLowerCase() === 'graph' || parts[2].toLowerCase() === 'graph')) {
    codeForm = <>
      <h2 className={s['title']}>GraphQL</h2>
      <GraphForm />
    </>
  } else router.push('/404');

  return (
    <div data-testid="client">
      {codeForm}
    </div>
  );
};

export default Client;
