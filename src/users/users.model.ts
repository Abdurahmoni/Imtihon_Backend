import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../products/products.model';
import { Order } from '../orders/orders.model';
import { Wishlist } from '../wishlist/wishlist.model';
import { CartItem } from '../cart_items/cart_items.model';
import { Store } from '../stores/stores.model';
import { Address } from '../addresses/addresses.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  date_of_birth: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.ENUM('male', 'female'),
    allowNull: false,
    defaultValue: 'male',
  })
  gender: string;

  @Column({
    type: DataType.ENUM('customer', 'seller', 'admin', 'superadmin'),
    allowNull: false,
    defaultValue: 'customer',
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  permissions: string[];

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  address_id: number;

  @BelongsTo(() => Address)
  address: Address;

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Wishlist)
  wishlist: Wishlist[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasMany(() => Store)
  stores: Store[];
}
