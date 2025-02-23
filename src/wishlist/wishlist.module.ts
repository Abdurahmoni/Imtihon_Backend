import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { Wishlist } from './wishlist.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';
import { User } from 'src/users/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist, Product, User])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
