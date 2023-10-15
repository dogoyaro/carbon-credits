import Image from 'next/image';
interface IProjectProps {
  id: string;
  name: string;
  description: string;
  weight: number;
  price: number;
  volume: number;
  image: string;
  supplier: string;
  country: string;
  date: string;
}

export function Project(props: IProjectProps) {
  const {
    id,
    name,
    description,
    weight,
    price,
    volume,
    image,
    supplier,
    country,
    date
  } = props;

  return (
    <div>
      <Image src={image} alt={`${id}-${name}-image`} />
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{supplier}</p>
        <div>
          <>
            <h3>Price:</h3>
            <p>{price}</p>
          </>
          <>
            <h3>Weight:</h3>
            <p>{weight}</p>
          </>
          <>
            <h3>Offered Volume:</h3>
            <p>{volume}</p>
          </>
          <>
            <h3>Country:</h3>
            <p>{country}</p>
          </>
          <>
            <h3>Earliest Date:</h3>
            <p>{date}</p>
          </>
        </div>
      </div>
    </div>
  );
}

export function ProjectList(props: {projects: IProjectProps[]}) {
  const {projects} = props;
  return (
    <div>
      {projects.map((project) => (
        <Project {...project} key={project.id} />
      ))}
    </div>
  );
}
