import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { Permissions } from 'src/common/guard/roles.decorator';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('StorePost')
  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/store_logos',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 10000);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStoreDto: CreateStoreDto,
    @Req() req,
  ) {
    if (file) {
      createStoreDto.logo = file.filename;
    }
    createStoreDto.seller_id = req.user.id;
    return this.storesService.create(createStoreDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('StoreGetAll')
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('StoreGetOne')
  @Get('getMe')
  async findOne(@Req() req) {
    return this.storesService.findOne(req.user.id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('StoreGetOne')
  @Get('me')
  async findMe(@Req() req) {
    return this.storesService.findBySellerId(req.user.id);
  }
  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('StoreUpdate')
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/store_logos',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 10000);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    const store = await this.storesService.findOne(+id);

    if (file?.filename) {
      if (store && store.logo) {
        const filePath = join(
          __dirname,
          '..',
          '..',
          'uploads',
          'store_logos',
          store.logo,
        );
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting the file:', err);
          } else {
            console.log('File deleted successfully:', filePath);
          }
        });
      }
    }

    if (file) {
      updateStoreDto.logo = file.filename;
    }
    return this.storesService.update(+id, updateStoreDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('StoreDelete')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const store = await this.storesService.findOne(+id);
    console.log('store', store);

    if (store && store.logo) {
      const filePath = join(
        __dirname,
        '..',
        '..',
        'uploads',
        'store_logos',
        store.logo,
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully:', filePath);
        }
      });
    }
    return this.storesService.remove(+id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('StoreImageDelete')
  @Delete('images/:id')
  async removeImage(@Param('id') id: string) {
    const store = await this.storesService.findOne(+id);
    console.log('store', store);

    if (store && store.logo) {
      const filePath = join(
        __dirname,
        '..',
        '..',
        'uploads',
        'store_logos',
        store.logo,
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully:', filePath);
        }
      });
    }
    return this.storesService.remove(+id);
  }
}
