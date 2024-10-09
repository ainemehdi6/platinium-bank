import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
  ) {}

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    return this.transactionRepository.create(transaction);
  }

  async findOne(id: number): Promise<Transaction> {
    return this.transactionRepository.findByPk<Transaction>(id);
  }

  async findAll(): Promise<Transaction[]> {
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

  async delete(id: number): Promise<number> {
    return this.transactionRepository.destroy({
      where: { id },
    });
  }

  async findLastTransactions(accountId: number): Promise<Transaction[]> {
    return this.transactionRepository.findAll({
      where: { accountId },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
  }
}
