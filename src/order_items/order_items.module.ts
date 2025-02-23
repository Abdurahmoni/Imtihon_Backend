import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './order_items.model';
import { Order } from 'src/orders/orders.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem, Order])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
