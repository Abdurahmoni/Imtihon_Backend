import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  IsArray,
  IsDate,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsDate()
  @IsOptional()
  date_of_birth?: Date;

  @IsString()
  @IsOptional()
  phone?: string;

  // @IsEnum(['male', 'female'])
  // @IsOptional()
  // gender?: string;

  // @IsEnum(['customer', 'seller', 'admin'])
  // @IsOptional()
  // role?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];
}
