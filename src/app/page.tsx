import {ProjectList} from '@/components/Project';
import {getAllProjects} from '@/app/actions';

export default async function Home() {
  const projects = await getAllProjects();
  return (
    <main className='flex min-h-screen flex-col'>
      <div className='p-24 mb-8  bg-zinc-300  backdrop-blur-2xl flex items-start jusify-start gap-12'>
        <h1 className='text-4xl font-bold text-center'>All Projects</h1>
      </div>
      <ProjectList projects={projects} />
    </main>
  );
}
