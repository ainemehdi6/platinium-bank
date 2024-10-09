import { Module } from '@nestjs/common';
import { DabController } from './dab.controller';
import { DabService } from './dab.service';
import { UserModule } from 'src/user/user.module';
import { CreditCardModule } from 'src/credit-card/credit-card.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { AccountModule } from 'src/account/account.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, CreditCardModule, TransactionModule, AccountModule, AuthModule],
  controllers: [DabController],
  providers: [DabService]
})
export class DabModule {}
