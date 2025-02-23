import { IsEnum, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  customer_id?: number;

  address_id?: number;

  @IsEnum(['pending', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  total_price?: number;
}
