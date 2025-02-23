import { IsEnum, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsEnum(['click', 'payme'])
  payment_method: string;

  @IsInt()
  @IsNotEmpty()
  payment_card_id: number;

  @IsPositive()
  amount: number;

  @IsEnum(['Tolanmagan', 'Tolangan'])
  status?: string; // Default qiymat modelda "Tolanmagan"
}
