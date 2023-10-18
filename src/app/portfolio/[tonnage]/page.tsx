import {getPortfolio} from '@/app/actions';
import {ProjectList} from '@/components/Project';

export default async function Portfolio({params}: {params: {tonnage: number}}) {
  const {tonnage} = params;
  const portfolio = await getPortfolio(tonnage);
  const {price, tonnage: totalTonnage, projects} = portfolio;

  return (
    <div>
      <div>
        <h1 className='text-4xl font-bold text-center'>
          Recommended Portfolio
        </h1>
        <h2 className='text-2xl font-bold text-center'>
          ${price} for {totalTonnage} tons
        </h2>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
