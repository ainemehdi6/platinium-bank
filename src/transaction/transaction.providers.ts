import { Transaction } from './transaction.entity';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useValue: Transaction,
  },
];
