import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  Unique,
  HasMany,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Account } from 'src/account/account.entity';
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

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
  })
  expirationDate: string;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
  })
  cvv: string;

  @Column({
    type: DataType.STRING(4),
    allowNull: false,
  })
  pin: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId: number;

  @BelongsTo(() => Account)
  account: Account;
}
