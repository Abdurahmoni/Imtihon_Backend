import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'banners' })
export class Banner extends Model<Banner> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_active: boolean;
}
