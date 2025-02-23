import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { PaymentsModule } from './payments/payments.module';
import { AddressesModule } from './addresses/addresses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharingModule } from './common/sharing.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { StoresModule } from './stores/stores.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PaymentCardModule } from './payment-card/payment-card.module';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DATABASE_URL,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'store_logos'),
      serveRoot: '/store',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'products'),
      serveRoot: '/product',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'banners'),
      serveRoot: '/banners',
    }),
    SharingModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartItemsModule,
    OrdersModule,
    OrderItemsModule,
    PaymentsModule,
    AddressesModule,
    ReviewsModule,
    WishlistModule,
    StoresModule,
    PaymentCardModule,
    BannerModule,
  ],
})
export class AppModule {}
