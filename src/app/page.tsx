import { metadata } from "./modules/metadata";

export default function Home() {
  metadata.title = 'GraphiQL App';
  metadata.description = 'GraphiQl app home page';

  return (
    <main>
      Home page...
    </main>
  );
}
