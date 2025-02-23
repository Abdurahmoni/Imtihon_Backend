import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './cart_items.model';
import { Product } from 'src/products/products.model';

@Module({
  imports: [SequelizeModule.forFeature([CartItem, Product])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService],
})
export class CartItemsModule {}
