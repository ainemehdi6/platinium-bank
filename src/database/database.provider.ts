import { Sequelize } from 'sequelize-typescript';

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
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
