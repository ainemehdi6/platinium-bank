import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountProviders } from './account.providers';

@Module({
    controllers: [AccountController],
    providers: [AccountService, ...accountProviders],
    exports : [AccountService]
  })
export class AccountModule {}
