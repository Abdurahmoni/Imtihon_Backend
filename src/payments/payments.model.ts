import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Order } from '../orders/orders.model';
import { User } from '../users/users.model';
import { PaymentCard } from 'src/payment-card/payment-card.model';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.ENUM('click', 'payme'),
    allowNull: false,
  })
  payment_method: string;

  @ForeignKey(() => PaymentCard)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payment_card_id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM('Tolanmagan', 'Tolangan'),
    allowNull: false,
    defaultValue: 'Tolanmagan',
  })
  status: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => PaymentCard)
  payment_card: PaymentCard;
}
