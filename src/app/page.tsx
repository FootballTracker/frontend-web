import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/times');
  return (
    <div>
      <h1 className="font-bold text-7xl text-red font-kdam">Tela inicial</h1>
    </div>
  );
}
