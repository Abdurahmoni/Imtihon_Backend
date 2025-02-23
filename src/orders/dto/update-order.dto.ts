import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum([
    'yigilmoqda',
    'yetkazilmoqda',
    'yetkazildi',
    'qabul qilindi',
    'bekor qilindi',
  ])
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsOptional()
  total_price?: number;
}
