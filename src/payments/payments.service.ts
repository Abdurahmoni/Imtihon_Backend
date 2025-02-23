import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './payments.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentRepository: typeof Payment,
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.create(createPaymentDto);
  }

  findAll() {
    return this.paymentRepository.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.paymentRepository.findByPk(id, { include: { all: true } });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(updatePaymentDto, { where: { id } });
  }

  remove(id: number) {
    return this.paymentRepository.destroy({ where: { id } });
  }
}
