import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TransactionType } from './transaction-type.enum';
import { CreditCard } from 'src/credit-card/credit-card.entity';
import { Account } from 'src/account/account.entity';

@Table
export class Transaction extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(TransactionType),
    defaultValue: TransactionType.WITHDRAW,
  })
  type: TransactionType;

  @Column(DataType.DECIMAL(10, 2))
  amount: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  date: Date;

  @ForeignKey(() => CreditCard)
  @Column
  creditCardId: number;

  @BelongsTo(() => CreditCard)
  creditCard: CreditCard;

  @ForeignKey(() => Account)
  @Column
  accountId: number;

  @BelongsTo(() => Account)
  account: Account;
}
