import Image from 'next/image';
import type {Project} from '@/types';

export function Project(props: Project) {
  const {
    id,
    name,
    description,
    distribution_weight: weight,
    price_per_ton: price,
    offered_volume_in_tons: volume,
    image,
    supplier_name: supplier,
    country,
    earliest_delivery: date
  } = props;

  return (
    <div className='flex flex-row px-3 gap-16 justify-center p-8 group rounded hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
      <Image
        className='rounded h-64 w-64 m-8'
        src={image}
        alt={`${id}-${name}-image`}
        width={100}
        height={100}
      />
      <div>
        <h2 className='font-semibold'>{name}</h2>
        <h6 className='font-light text-sm'>{supplier}</h6>
        <p className='text-sm opacity-50 py-8'>{description}</p>
        <div className='flex flex-row'>
          <Tag text={`${price || 1000} USD`} color='blue' />
          <Tag text={`${weight} per tonns`} color='green' />
          <Tag text={`${volume} tons`} color='amber' />
          <Tag text={country} color='emerald' />
          <Tag text={date} color='stone' />
        </div>
      </div>
    </div>
  );
}

export function ProjectList(props: {projects: Project[]}) {
  const {projects} = props;
  return (
    <div className='mx-10'>
      {projects.map((project) => (
        <Project {...project} key={project.id} />
      ))}
    </div>
  );
}

export function Tag(props: {text: string; color: string}) {
  return (
    <div
      className={`rounded-full px-3 py-1 text-xs font-semibold text-${props.color}-600  bg-${props.color}-300 inline-block mr-2`}
    >
      {props.text}
    </div>
  );
}

