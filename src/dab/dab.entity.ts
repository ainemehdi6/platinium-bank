import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';
import { Account } from 'src/account/account.entity';
import { TransactionType } from 'src/transaction/transaction-type.enum';

@Table({ tableName: 'dab_logs' })
export class DabLog extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  operationType: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  date: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Account)
  @Column
  accountId: number;

  @BelongsTo(() => Account)
  account: Account;
}
