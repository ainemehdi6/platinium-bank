import { Table, Column, Model, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';
import { CreditCard } from 'src/credit-card/credit-card.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/user/user.entity';
@Table
export class Account extends Model<Account> {
  @Column
  type: string; 

  @Column
  balance: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => User)
  @Column({ allowNull: true })
  secondUserId: number;

  @BelongsTo(() => User, 'secondUserId')
  secondUser: User;

  @HasMany(() => CreditCard)
  creditCards: CreditCard[];

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
