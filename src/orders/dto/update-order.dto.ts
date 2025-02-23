import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum(['pending', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  total_price?: number;
}
