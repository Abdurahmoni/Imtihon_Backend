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
import { Category } from '../categories/categories.model';
import { OrderItem } from '../order_items/order_items.model';
import { Store } from '../stores/stores.model';
import { Wishlist } from 'src/wishlist/wishlist.model';
import { CartItem } from 'src/cart_items/cart_items.model';
import { Review } from 'src/reviews/reviews.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  image: string[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  seller_id: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  store_id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @BelongsTo(() => User)
  seller: User;

  @BelongsTo(() => Store)
  store: Store;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => Wishlist)
  wishlists: Wishlist[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasMany(() => Review)
  reviews: Review[];
}
