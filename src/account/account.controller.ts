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

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Account> {
    return this.accountService.findOne(id);
  }

  @Post()
  async create(@Body() Account: Account): Promise<Account> {
    return this.accountService.create(Account);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() Account: Account): Promise<[number, Account[]]> {
    return this.accountService.update(id, Account);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.accountService.delete(id);
  }

}
