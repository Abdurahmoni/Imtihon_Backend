import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {
  user_id?: number;

  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  quantity?: number;

  total_price?: number;
}
