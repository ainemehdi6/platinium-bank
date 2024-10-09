import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
  ) {}

  create(transaction: Partial<Transaction>): Promise<Transaction> {
    return this.transactionRepository.create(transaction);
  }

  findOne(id: number): Promise<Transaction> {
    return this.transactionRepository.findByPk<Transaction>(id);
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async update(
    id: number,
    updateTransactionDto: Partial<Transaction>,
  ): Promise<[number, Transaction[]]> {
    return this.transactionRepository.update<Transaction>(
      updateTransactionDto,
      {
        where: { id },
        returning: true,
      },
    );
  }

  delete(id: number): Promise<number> {
    return this.transactionRepository.destroy({
      where: { id },
    });
  }
}
