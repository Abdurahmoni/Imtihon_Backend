import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/orders/orders.model';
import { OrderItem } from './order_items.model';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(OrderItem) private orderItemRepository: typeof OrderItem,
  ) {}
  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemRepository.create(createOrderItemDto);
  }

  findAll() {
    return this.orderItemRepository.findAll({ include: { all: true } });
  }

  findOrder(id: number) {
    return this.orderItemRepository.findAll({
      where: { order_id: id },
      include: { all: true },
    });
  }

  findOne(id: number) {
    return this.orderItemRepository.findByPk(id);
  }

  async findStore(id: number) {
    const order = await this.orderItemRepository.findAll({
      where: { store_id: id },
      include: { all: true },
    });
    return order;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemRepository.update(updateOrderItemDto, {
      where: { id },
      returning: true,
    });
  }
  async updateStatus(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const order = await this.orderItemRepository.update(updateOrderItemDto, {
      where: { id },
      returning: true,
    });
    if (updateOrderItemDto.status) {
      const orderItem = await this.orderItemRepository.findAll({
        where: { order_id: order[1][0].order_id },
        include: { all: true },
      });

      orderItem.forEach((item) => {
        if (item.status === 'yigilmoqda') {
          return order;
        }
      });

      return this.orderRepository.update(
        { status: 'yetkazilmoqda' },
        { where: { id: order[1][0].order_id } },
      );
    }
  }

  remove(id: number) {
    return this.orderRepository.destroy({ where: { id } });
  }
}
