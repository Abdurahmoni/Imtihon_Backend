import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { OrderItem } from '../order_items/order_items.model';
import { Address } from '../addresses/addresses.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @Column({
    type: DataType.ENUM(
      'yigilmoqda',
      'yetkazilmoqda',
      'yetkazildi',
      'qabul qilindi',
      'bekor qilindi',
    ),
    allowNull: false,
    defaultValue: 'yigilmoqda',
  })
  status: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  total_price: number;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  address_id: number;

  @BelongsTo(() => User)
  customer: User;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @BelongsTo(() => Address)
  address: Address;
}
