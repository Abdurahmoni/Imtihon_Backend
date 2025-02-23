import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Payment } from 'src/payments/payments.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'payment_cards' })
export class PaymentCard extends Model<PaymentCard> {
  @Column({
    type: DataType.ENUM('Visa', 'MasterCard', 'HUMO', 'UZCARD'),
    allowNull: true,
  })
  card_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  card_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  expiration_date: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cvv: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @HasMany(() => Payment)
  payments: Payment[];
}
