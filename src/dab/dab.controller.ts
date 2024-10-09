import { Controller, Post, Get, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { DabService } from './dab.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('dab')
export class DabController {
    constructor(private readonly dabService: DabService) {}

    @Post('login')
    async login(@Body() loginDto: { cardNumber: string; pin: string }) {
      return this.dabService.login(loginDto.cardNumber, loginDto.pin);
    }

    @UseGuards(JwtAuthGuard)
    @Post('transfer')
    async transfer(@Body() transferDto: { fromAccountId: number; toAccountId: number; amount: number }) {
        return this.dabService.transfer(transferDto.fromAccountId, transferDto.toAccountId, transferDto.amount);
    }

    @UseGuards(JwtAuthGuard)
    @Post('deposit')
    async depositCheck(@Body() depositDto: { accountId: number; amount: number; delay?: number }) {
        return this.dabService.depositCheck(depositDto.accountId, depositDto.amount, depositDto.delay);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('logout')
    async logout() {
        return this.dabService.logout();
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
