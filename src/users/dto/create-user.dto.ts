import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsArray,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  date_of_birth?: Date;

  phone: string;

  gender?: string;

  @IsEnum(['customer', 'seller', 'admin'])
  @IsOptional() // Agar kiritilmasa, default `customer` bo‘ladi
  role?: string;

  @IsBoolean()
  @IsOptional() // Default false bo‘lgani uchun optional qildim
  is_active?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional() // Default `[]` bo‘lgani uchun optional qildim
  permissions?: string[];
}
