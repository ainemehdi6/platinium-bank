import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  Unique,
} from 'sequelize-typescript';

@Table
export class CreditCard extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Unique
  @Column(DataType.STRING(16))
  cardNumber: string;

  @Column(DataType.STRING(5))
  expirationDate: string;

  @Column(DataType.STRING(3))
  cvv: string;

  @Column(DataType.STRING(4))
  pin: string;
}
