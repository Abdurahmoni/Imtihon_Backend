import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Order } from '../orders/orders.model';

@Table({ tableName: 'addresses' })
export class Address extends Model<Address> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => Order)
  orders: Order[];
}
