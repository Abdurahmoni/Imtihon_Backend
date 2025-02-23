import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  price?: string | number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];

  @IsOptional()
  seller_id?: string | number;

  @IsOptional()
  store_id?: string | number;

  @IsOptional()
  category_id?: string | number;
}
