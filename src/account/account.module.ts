import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountProviders } from './account.providers';
import { CreditCardModule } from 'src/credit-card/credit-card.module';

@Module({
    imports: [CreditCardModule],
    controllers: [AccountController],
    providers: [AccountService, ...accountProviders],
    exports : [AccountService]
  })
export class AccountModule {}
