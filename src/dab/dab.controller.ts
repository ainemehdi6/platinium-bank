import { Controller, Post, Get, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { DabService } from './dab.service';


@Controller('dab')
export class DabController {
    constructor(private readonly dabService: DabService) {}4

    @Post('login')
    async login(@Body() loginDto: { cardNumber: string; pin: string }) {
      return this.dabService.login(loginDto.cardNumber, loginDto.pin);
    }
}
