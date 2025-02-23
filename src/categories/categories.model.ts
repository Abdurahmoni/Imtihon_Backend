import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../products/products.model';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  
  @HasMany(() => Product)
  products: Product[];
}
