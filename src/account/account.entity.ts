// src/account/account.model.ts
import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';
export enum AccountType {
    COURANT = 'courant',
    PRO = 'pro',
    LIVRETA = 'livretA',
    COMMUN = 'commun',
}

@Table
export class Account extends Model<Account> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: DataType.ENUM(...Object.values(AccountType)),
        allowNull: false,
    })
    type: AccountType;

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
