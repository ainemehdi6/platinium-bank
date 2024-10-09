import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCard } from './credit-card.entity';

@Controller('credit-cards')
export class CreditCardController {
  constructor(private creditCardService: CreditCardService) {}

  @Post()
  create(@Body() card: Partial<CreditCard>) {
    return this.creditCardService.create(card);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.creditCardService.findOne(id);
  }

  @Get()
  findAll() {
    return this.creditCardService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() card: Partial<CreditCard>) {
    return this.creditCardService.update(id, card);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.creditCardService.delete(id);
  }
}
