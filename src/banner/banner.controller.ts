import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { Permissions } from 'src/common/guard/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

const storage = diskStorage({
  destination: './uploads/banners',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `banner-${uniqueSuffix}${ext}`);
  },
});

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin')
  @Permissions('BannerPost')
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    if (image) {
      createBannerDto.image = `${image.filename}`;
    }

    return this.bannerService.create(createBannerDto);
  }

  // @UseGuards(RoleGuard, PermissionGuard)
  // @Roles('superadmin', 'admin', 'seller', 'customer')
  // @Permissions('BannerGetAll')
  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  // @UseGuards(RoleGuard, PermissionGuard)
  // @Roles('superadmin', 'admin', 'seller', 'customer')
  // @Permissions('BannerGetOne')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin')
  @Permissions('BannerUpdate')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    const banner = await this.bannerService.findOne(+id);

    if (image) {
      if (banner && banner.image) {
        const oldImagePath = join(
          __dirname,
          '..',
          '..',
          'uploads',
          banner.image,
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Old image delete error:', err);
          } else {
            console.log('Old image deleted:', oldImagePath);
          }
        });
      }
      updateBannerDto.image = `${image.filename}`;
    }

    return this.bannerService.update(+id, updateBannerDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin')
  @Permissions('BannerDelete')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const banner = await this.bannerService.findOne(+id);

    if (banner && banner.image) {
      const imagePath = join(__dirname, '..', '..', 'uploads', banner.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Image delete error:', err);
        } else {
          console.log('Image deleted:', imagePath);
        }
      });
    }

    return this.bannerService.remove(+id);
  }
}
