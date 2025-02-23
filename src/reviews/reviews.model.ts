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

@Table({ tableName: 'reviews' })
export class Review extends Model<Review> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rating: number; // 1 - 5 oralig'ida baho

  @Column({ type: DataType.TEXT, allowNull: true })
  comment: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
