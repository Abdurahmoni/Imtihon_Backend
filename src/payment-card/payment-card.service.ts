import { Injectable } from '@nestjs/common';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { UpdatePaymentCardDto } from './dto/update-payment-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentCard } from './payment-card.model';

@Injectable()
export class PaymentCardService {
  constructor(
    @InjectModel(PaymentCard) private paymentCardRepository: typeof PaymentCard,
  ) {}
  create(createPaymentCardDto: CreatePaymentCardDto) {
    return this.paymentCardRepository.create(createPaymentCardDto);
  }

  findAll() {
    return this.paymentCardRepository.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.paymentCardRepository.findByPk(id, { include: { all: true } });
  }

  update(id: number, updatePaymentCardDto: UpdatePaymentCardDto) {
    return this.paymentCardRepository.update(updatePaymentCardDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.paymentCardRepository.destroy({ where: { id } });
  }
}
