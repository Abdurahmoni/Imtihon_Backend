import { Inject, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { CartItem } from './cart_items.model';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectModel(CartItem) private cartItemRepository: typeof CartItem,
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}
  async create(createCartItemDto: CreateCartItemDto) {
    const { product_id, quantity } = createCartItemDto;
    const product = await this.productModel.findByPk(product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    if (isNaN(createCartItemDto.total_price)) {
      createCartItemDto.total_price = 0;
    }

    createCartItemDto.total_price =
      Number(product.price) * 1 + Number(createCartItemDto.total_price);

    return this.cartItemRepository.create(createCartItemDto);
  }

  findAll(user_id: number) {
    return this.cartItemRepository.findAll({
      where: { user_id },
      include: { all: true },
    });
  }

  findOne(id: number) {
    return this.cartItemRepository.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemRepository.update(updateCartItemDto, { where: { id } });
  }

  remove(id: number) {
    return this.cartItemRepository.destroy({ where: { id } });
  }
}
