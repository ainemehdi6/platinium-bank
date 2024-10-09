import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionType } from './transaction-type.enum';
import { Op } from 'sequelize';

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

  async findTodayWithdrawalsTotal(accountId: number): Promise<number> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalWithdrawals = await this.transactionRepository.sum('amount', {
      where: {
        accountId,
        type: TransactionType.WITHDRAW,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    return totalWithdrawals || 0;
  }

}
