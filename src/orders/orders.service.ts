import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './orders.model';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from 'src/cart_items/cart_items.model';
import { OrderItem } from 'src/order_items/order_items.model';
import { User } from 'src/users/users.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(CartItem) private cartItemRepository: typeof CartItem,
    @InjectModel(OrderItem) private orderItemRepository: typeof OrderItem,
    @InjectModel(User) private userModel: typeof User,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);

    const cart = this.cartItemRepository.findAll({
      where: { user_id: createOrderDto.customer_id },
      include: { all: true },
    });
    let total_price = 0;
    await cart.then((items) => {
      items.forEach((item) => {
        total_price += item.total_price;

        this.orderItemRepository.create({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          total_price: item.total_price,
          seller_id: item.product.seller_id,
          store_id: item.product.store_id,
        });
      });
    });
    const user = await this.userModel.findByPk(createOrderDto.customer_id, {
      include: { all: true },
    });
    if (user.address) {
      console.log(user.address);
      
      createOrderDto.address_id = user.address.id;
    }

    await this.orderRepository.update(
      { total_price },
      { where: { id: order.id } },
    );

    return this.orderRepository.findByPk(order.id, { include: { all: true } });
  }

  findAll() {
    return this.orderRepository.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.orderRepository.findAll({
      where: { customer_id: id },
      include: { all: true },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(updateOrderDto, { where: { id } });
  }

  remove(id: number) {
    return this.orderRepository.destroy({ where: { id } });
  }
}
