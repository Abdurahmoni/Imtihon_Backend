import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from '../orders/orders.model';
import { Product } from '../products/products.model';
import { User } from '../users/users.model';
import { Store } from '../stores/stores.model';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  order_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  total_price: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  seller_id: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  store_id: number;

  @Column({
    type: DataType.ENUM('yigilmoqda', 'yigildi'),
    allowNull: false,
    defaultValue: 'yigilmoqda',
  })
  status: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  seller: User;

  @BelongsTo(() => Store)
  store: Store;
}
