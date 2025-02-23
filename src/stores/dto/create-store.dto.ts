export class CreateStoreDto {
  // Do'kon nomi (required)
  name: string;

  // Do'konning ta'rifi (optional)
  description?: string;

  // Do'kon logotipi (optional)
  logo?: string;

  // Ko'chasi (optional)
  street?: string;

  // Shahar (optional)
  city?: string;

  // Viloyati yoki mintaqasi (optional)
  state?: string;

  // Seller ID (required)
  seller_id: number;
}
