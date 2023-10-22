export interface Project {
  id: string;
  name: string;
  description: string;
  distribution_weight: number;
  price_per_ton: number;
  offered_volume_in_tons: number;
  image: string;
  supplier_name: string;
  country: string;
  earliest_delivery: string;
}
