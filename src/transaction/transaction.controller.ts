import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: Partial<Transaction>) {
    return this.transactionService.create(transaction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionService.findOne(id);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() transaction: Partial<Transaction>) {
    return this.transactionService.update(id, transaction);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.transactionService.delete(id);
  }
}
