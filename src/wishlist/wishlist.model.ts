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

@Table({ tableName: 'wishlist' })
export class Wishlist extends Model<Wishlist> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;
}
