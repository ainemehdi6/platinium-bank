import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { DabService } from './dab.service';
import { DabLog } from './dab.entity';

@Controller('dab')
export class DabController {
    constructor(private readonly dabService: DabService) {}4

    @Post('login')
    async login(@Body() loginDto: { cardNumber: string; pin: string }) {
      return this.dabService.login(loginDto.cardNumber, loginDto.pin);
    }

    @Get('accounts/balance')
    async getAccountsBalance() {
        return this.dabService.getAccountsBalance();
    }

    @Get('accounts/:accountId/transactions')
    async getLastTransactions(@Param('accountId') accountId: number) {
        return this.dabService.getLastTransactions(accountId);
    }

    @Post('accounts/:accountId/withdraw')
    async withdraw(@Param('accountId') accountId: number, @Body() withdrawDto: { amount: number }) {
        return this.dabService.withdraw(accountId, withdrawDto.amount);
    }

  @Get('logs')
  async getLogsByDabId(): Promise<DabLog[]> {
    return this.dabService.findAllDabLog();
  }

  @Get('logs/user/:userId')
  async getLogsByUserId(@Param('userId') userId: number): Promise<DabLog[]> {
    return this.dabService.findDabLogByUserId(userId);
  }

  @Get('logs/account/:accountId')
  async getLogsByAccountId(
    @Param('accountId') accountId: number,
  ): Promise<DabLog[]> {
    return this.dabService.findDabLogByAccountId(accountId);
  }
}
