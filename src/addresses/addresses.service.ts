import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './addresses.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Order } from 'src/orders/orders.model';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address) private addressRepository: typeof Address,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Order) private orderModel: typeof Order,
  ) {}
  async create(createAddressDto: CreateAddressDto, userId: number) {
    const address = await this.addressRepository.create(createAddressDto);
    console.log(address.id);
    console.log(userId);

    const user = await this.userModel.update(
      { address_id: address.id },
      { where: { id: userId }, returning: true },
    );
    console.log(user);

    return address;
  }
  async orderAddress(createAddressDto: CreateAddressDto, orderId: number) {
    const address = await this.addressRepository.create(createAddressDto);
    console.log(address.id);
    console.log(orderId);

    const order = await this.orderModel.update(
      { address_id: address.id },
      { where: { id: orderId }, returning: true },
    );

    return address;
  }

  findAll() {
    return this.addressRepository.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.addressRepository.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(updateAddressDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.addressRepository.destroy({ where: { id } });
  }
}
