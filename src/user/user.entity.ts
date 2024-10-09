import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Account } from 'src/account/account.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number; 

  @Column({
    type: DataType.STRING(50), 
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(50), 
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(100), 
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    },
  })
  email: string;

  @Column({
    type: DataType.STRING(100), 
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.FLOAT, 
    allowNull: false,
    defaultValue: 0.0, 
  })
  ceiling: number;

  @HasMany(() => Account)
  accounts: Account[];
}
