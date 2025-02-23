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
import { Product } from 'src/products/products.model';
import { OrderItem } from 'src/order_items/order_items.model';

@Table({ tableName: 'stores' })
export class Store extends Model<Store> {
  // Do'kon nomi
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  // Do'konning ta'rifi (optional)
  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  // Do'kon logotipi (optional)
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
  logo: string;

  // Ko'chasi (optional)
  @Column({ type: DataType.STRING, allowNull: true })
  street: string;

  // Shahar (optional)
  @Column({ type: DataType.STRING, allowNull: true })
  city: string;

  // Viloyati yoki mintaqasi (optional)
  @Column({ type: DataType.STRING, allowNull: true })
  state: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  seller_id: number;

  @BelongsTo(() => User)
  seller: User;

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
