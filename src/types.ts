export interface Project {
  id: string;
  name: string;
  description: string;
  distribution_weight: string;
  price_per_ton: string;
  offered_volume_in_tons: string;
  image: string;
  supplier_name: string;
  country: string;
  earliest_delivery: string;
}

export interface PortfolioProject extends Project {
  volume: number;
}
