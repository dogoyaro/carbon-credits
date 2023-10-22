'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';

export function CreatePortfolioButton() {
  const [totalTonnage, setTotalTonnage] = useState(null);
  const router = useRouter();

  const handleCreatePortfolio = () => {
    if (totalTonnage === null) {
      return;
    }

    router.push(`/portfolio/${totalTonnage}`);
  };

  const handleTonnageChange = (event: any) => {
    event.preventDefault();

    const tonnage = event.target.value;

    // TODO: validate the input
    // validate the input

    setTotalTonnage(tonnage);
  };

  return (
    <div className='flex gap-2'>
      <input
        className='border border-gray-300 focus:outline-none w-2/3 h-10 placeholder-slate-300 pl-4 rounded'
        type='text'
        placeholder='2000'
        onChange={handleTonnageChange}
      />
      <button
        className='rounded bg-green-700 px-2 text-stone-200'
        onClick={handleCreatePortfolio}
      >
        Portfolio
      </button>
    </div>
  );
}
