import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { Permissions } from 'src/common/guard/roles.decorator';

const storage = diskStorage({
  destination: './uploads/products',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(RoleGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Get('sellerProducts')
  findSeller(@Req() req) {
    console.log('req.user.id', req.user);

    return this.productsService.findSeller(req.user.id);
  }
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // @UseGuards(RoleGuard, PermissionGuard)
  // @Roles('superadmin', 'admin', 'seller', 'customer')
  // @Permissions('ProductGetOne')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // @UseGuards(RoleGuard, PermissionGuard)
  // @Roles('superadmin', 'admin', 'seller', 'customer')
  // @Permissions('ProductGetOneFilter')
  @Get('filter/:category_id')
  async getImages(@Param('category_id') category_id: string) {
    return this.productsService.getImages(category_id);
  }

  @Get('search/:name')
  async search(@Param('name') name: string) {
    return this.productsService.search(name);
  }

  @Get('filter/:max_price/:min_price')
  async getFilteredProducts(
    @Param('max_price') maxPrice: string,
    @Param('min_price') minPrice: string,
    @Query('category') category?: string, // Query orqali olinadi
  ) {
    return await this.productsService.getPriceFilter(
      +maxPrice,
      +minPrice,
      category,
    );
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('ProductPost')
  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, { storage }))
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
    @Req() req,
  ) {
    if (images && images.length > 0) {
      createProductDto.image = images.map((file) => `${file.filename}`);
    }

    createProductDto.seller_id = req.user.id;

    return this.productsService.create(createProductDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('ProductImagePost')
  @Post('add-images/:id')
  @UseInterceptors(FilesInterceptor('images', 10, { storage }))
  async addImages(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() req,
  ) {
    console.log(images);
    return this.productsService.addMultipleImages(+id, images);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('ProductUpdate')
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10, { storage }))
  async update(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (images && images.length > 0) {
      updateProductDto.image = images.map((file) => `${file.filename}`);
    }

    updateProductDto.seller_id = Number(updateProductDto.seller_id);
    updateProductDto.store_id = Number(updateProductDto.store_id);
    updateProductDto.category_id = Number(updateProductDto.category_id);

    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('ProductDelete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('ProductDeleteImage')
  @Delete('image/:product_id/:image_id')
  async removeImage(
    @Param('product_id') product_id: string,
    @Param('image_id') image_id: string,
  ) {
    return this.productsService.deleteImage(+product_id, image_id);
  }
}
