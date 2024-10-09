import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { transactionProviders } from './transaction.providers';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProviders],
  exports: [TransactionService]

})
export class TransactionModule {}
