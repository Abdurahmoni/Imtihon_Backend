import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { OrderItem } from 'src/order_items/order_items.model';
import { CartItem } from 'src/cart_items/cart_items.model';
import { User } from 'src/users/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItem, CartItem, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
