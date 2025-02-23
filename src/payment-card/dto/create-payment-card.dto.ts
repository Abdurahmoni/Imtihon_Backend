import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePaymentCardDto {
  @IsOptional()
  @IsString()
  payment_id: number;

  @IsOptional()
  @IsEnum(['Visa', 'MasterCard', 'HUMO', 'UZCARD'])
  card_type: string;

  @IsOptional()
  @IsString()
  card_number: string;

  @IsOptional()
  @IsString()
  expiration_date: string;

  @IsOptional()
  @IsString()
  cvv: string;
}
