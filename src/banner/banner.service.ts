import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Banner } from './banner.model';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner) private readonly bannerModel: typeof Banner,
  ) {}
  create(createBannerDto: CreateBannerDto) {
    return this.bannerModel.create(createBannerDto);
  }

  findAll() {
    return this.bannerModel.findAll();
  }

  findOne(id: number) {
    return this.bannerModel.findByPk(id);
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return this.bannerModel.update(updateBannerDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.bannerModel.destroy({ where: { id } });
  }
}
