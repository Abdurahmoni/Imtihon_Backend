import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './addresses.model';
import { User } from 'src/users/users.model';
import { Order } from 'src/orders/orders.model';

@Module({
  imports: [SequelizeModule.forFeature([Address, User, Order])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
