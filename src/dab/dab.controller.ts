import { Controller, Post, Get, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { DabService } from './dab.service';


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

    @Patch('accounts/:accountId/withdraw')
    async withdraw(@Param('accountId') accountId: number, @Body() withdrawDto: { amount: number }) {
        return this.dabService.withdraw(accountId, withdrawDto.amount);
    }
}
