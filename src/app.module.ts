import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditCardModule } from './credit-card/credit-card.module';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { DabModule } from './dab/dab.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, CreditCardModule, TransactionModule, UserModule, AccountModule, DabModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
