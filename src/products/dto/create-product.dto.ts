import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: string | number;

  @IsOptional()
  image?: string[];

  seller_id: string | number;

  @IsNotEmpty()
  store_id: string | number;

  @IsNotEmpty()
  category_id: string | number;
}
