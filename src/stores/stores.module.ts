import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from './stores.model';
import { OrderItem } from 'src/order_items/order_items.model';

@Module({
  imports: [SequelizeModule.forFeature([Store, OrderItem])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
