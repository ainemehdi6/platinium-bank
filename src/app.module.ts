import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditCardModule } from './credit-card/credit-card.module';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [DatabaseModule, CreditCardModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
