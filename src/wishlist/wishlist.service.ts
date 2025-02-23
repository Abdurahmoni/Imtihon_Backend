import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './wishlist.model';
import { Product } from '../products/products.model';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist) private readonly wishlistModel: typeof Wishlist,
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async addToWishlist(user_id: number, product_id: number) {
    const product = await this.productModel.findByPk(product_id);
    if (!product) {
      throw new NotFoundException('Mahsulot topilmadi');
    }

    return this.wishlistModel.create({ user_id, product_id });
  }

  async getUserWishlist(user_id: number) {
    return this.wishlistModel.findAll({
      where: { user_id },
      include: [Product],
    });
  }

  async removeFromWishlist(user_id: number, product_id: number): Promise<void> {
    const wishlistItem = await this.wishlistModel.findOne({
      where: { user_id, product_id },
    });

    if (!wishlistItem) {
      throw new NotFoundException('Mahsulot wishlistda topilmadi');
    }

    await wishlistItem.destroy();
  }
}
