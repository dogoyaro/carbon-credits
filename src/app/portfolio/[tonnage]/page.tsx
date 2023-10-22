import {getPortfolio} from '@/app/actions';
import {ProjectList} from '@/components/Project';

export default async function Portfolio({params}: {params: {tonnage: number}}) {
  const {tonnage} = params;
  const portfolio = await getPortfolio(Number(tonnage));
  const {price, tonnage: totalTonnage, projects} = portfolio;

  return (
    <main className='flex min-h-screen flex-col'>
      <div className='p-24 mb-8  bg-zinc-300  backdrop-blur-2xl flex items-start jusify-start gap-12'>
        <h1 className='text-4xl font-bold text-center'>
          Recommended Portfolio
        </h1>
        <div>
          <h5 className='text-3xl font-semibold'>
            {totalTonnage} <span className='text-xl'>Tons</span>
          </h5>
          <h5 className='text-3xl font-semibold'>
            {price} <span className='text-xl'>USD</span>
          </h5>
        </div>
      </div>
      <ProjectList projects={projects} />
    </main>
  );
}
