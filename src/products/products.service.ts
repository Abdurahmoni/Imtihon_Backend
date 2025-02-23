import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from './products.model';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async create(createProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async findAll() {
    return await this.productModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.productModel.findByPk(id, { include: { all: true } });
  }
  async getImages(category_id: string) {
    console.log(category_id);

    if (category_id == '0')
      return await this.productModel.findAll({
        include: { all: true },
      });
    return await this.productModel.findAll({
      where: { category_id },
      include: { all: true },
    });
  }

  async findSeller(id: number) {
    return await this.productModel.findAll({
      where: { seller_id: id },
      include: { all: true },
    });
  }

  async search(name: string) {
    return await this.productModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: { all: true },
    });
  }

  async getPriceFilter(maxPrice: number, minPrice: number, category?: string) {
    return await this.productModel.findAll({
      where: {
        price: { [Op.between]: [minPrice, maxPrice] },
        ...(category && { category_id: category }),
      },
      include: { all: true },
    });
  }
  async update(id: number, updateProductDto) {
    const product = await this.productModel.findByPk(id);
    if (!product) return null;

    if (updateProductDto.image) {
      product.image = [...product.image, ...updateProductDto.image];
    }
    return await product.update(updateProductDto);
  }

  // async remove(id: number) {
  //   const product = await this.productModel.findByPk(id);
  //   if (!product) return null;

  //   if (product.image.length > 0) {
  //     for (const img of product.image) {
  //       const imagePath = path.join(
  //         __dirname,
  //         '..',
  //         '..',
  //         'uploads',
  //         'products',
  //         img.split('/').pop(),
  //       );
  //       if (fs.existsSync(imagePath)) {
  //         fs.unlinkSync(imagePath);
  //       }
  //     }
  //   }

  //   return await product.destroy();
  // }
  async remove(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) return null;

    if (
      product.image &&
      Array.isArray(product.image) &&
      product.image.length > 0
    ) {
      for (const img of product.image) {
        const imagePath = path.join(
          __dirname,
          '..',
          '..',
          'uploads',
          'products',
          path.basename(img),
        );

        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);
          } catch (err) {
            console.error(`Failed to delete image: ${imagePath}`, err);
          }
        }
      }
    }

    await product.destroy();

    return { message: 'Product and all images deleted successfully' };
  }

  async addMultipleImages(id: number, images: Express.Multer.File[]) {
    const product = await this.productModel.findByPk(id);
    if (!product) return null;

    const newImageUrls = images.map((file) => `${file.filename}`);
    product.image = [...product.image, ...newImageUrls];

    await product.save();
    return product;
  }

  async deleteImage(productId: number, imageId: string) {
    const product = await this.productModel.findByPk(productId);
    if (!product) return { message: 'Product not found' };

    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'products',
      imageId,
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    console.log(product.image[imageId]);

    fs.unlink(
      path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        'products',
        product.image[imageId],
      ),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );

    product.image.splice(Number(imageId), 1);

    await this.productModel.update(
      { image: product.image },
      { where: { id: productId } },
    );

    return { message: 'Image deleted successfully' };
  }
}
