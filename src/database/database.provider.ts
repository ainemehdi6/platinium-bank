import { Sequelize } from 'sequelize-typescript';
import { CreditCard } from 'src/credit-card/credit-card.entity';
import { Transaction } from 'src/transaction/transaction.entity';

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
      sequelize.addModels([Transaction, CreditCard]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
