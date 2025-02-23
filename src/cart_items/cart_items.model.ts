import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Product } from '../products/products.model';

@Table({ tableName: 'cart_items' })
export class CartItem extends Model<CartItem> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  quantity: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  total_price: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
