import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/account/account.entity';
import { CreditCard } from 'src/credit-card/credit-card.entity';
import { DabLog } from 'src/dab/dab.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/user/user.entity';

export const dbProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: '5iw-nest',
        password: '5iw-nest',
        database: 'platinium_bank',
      });
      sequelize.addModels([Transaction, CreditCard, User, Account, DabLog]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
