import { Module } from '@nestjs/common';
import { PaymentCardService } from './payment-card.service';
import { PaymentCardController } from './payment-card.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentCard } from './payment-card.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentCard])],
  controllers: [PaymentCardController],
  providers: [PaymentCardService],
})
export class PaymentCardModule {}
