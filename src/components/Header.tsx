import Link from 'next/link';
import {CreatePortfolioButton} from './CreatePortfolio';

export function Header() {
  return (
    <div className='p-8 flex justify-between'>
      <Link href='/'>
        <h1 className='font-bold text-xl text-green-900 '>Carbon Credits</h1>
      </Link>
      <CreatePortfolioButton />
    </div>
  );
}
