'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

function CreatePortfolioButton() {
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
    <>
      <input placeholder='2000' onChange={handleTonnageChange} />
      <button onClick={handleCreatePortfolio}>Create Portfolio</button>
    </>
  );
}

export function Header() {
  return (
    <div>
      <h1>Carbon Credits</h1>
      <CreatePortfolioButton />
    </div>
  );
}
