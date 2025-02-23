import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Banner } from './banner.model';

@Module({
  imports: [SequelizeModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
