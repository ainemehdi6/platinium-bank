import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

}
