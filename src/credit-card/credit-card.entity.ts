import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { Transaction } from 'src/transaction/transaction.entity';

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

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
