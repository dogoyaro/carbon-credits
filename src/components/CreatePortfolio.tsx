'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {z} from 'zod';

const Tonnage = z.coerce.number().min(1).max(1000000);

export function CreatePortfolioButton() {
  const [totalTonnage, setTotalTonnage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  const handleCreatePortfolio = () => {
    router.push(`/portfolio/${totalTonnage}`);
  };

  const handleTonnageChange = (event: any) => {
    event.preventDefault();

    const tonnage = event.target.value;

    const isValid = Tonnage.safeParse(tonnage).success;
    if (isValid) {
      setDisabled(false);
      setTotalTonnage(tonnage);
    } else {
      setDisabled(true);
    }
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
        className={`rounded bg-${
          disabled ? 'green-300' : 'green-700'
        } px-2 text-stone-200 ${disabled && 'cursor-not-allowed'}`}
        onClick={handleCreatePortfolio}
        disabled={disabled}
      >
        Portfolio
      </button>
    </div>
  );
}
