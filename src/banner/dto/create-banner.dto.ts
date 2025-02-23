import { IsBoolean, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional() // Fayl yuklanayotgan bo'lsa, uni validatsiya qilish shart emas
  image?: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  is_active?: boolean;
}
