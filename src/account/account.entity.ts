import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
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
}
