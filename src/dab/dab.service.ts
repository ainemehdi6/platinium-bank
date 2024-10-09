import { Injectable, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account, AccountType } from 'src/account/account.entity';
import { AccountService } from 'src/account/account.service';
import { AuthService } from 'src/auth/auth.service';
import { CreditCard } from 'src/credit-card/credit-card.entity';
import { CreditCardService } from 'src/credit-card/credit-card.service';
import { TransactionType } from 'src/transaction/transaction-type.enum';
import { Transaction } from 'src/transaction/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { DabLog } from './dab.entity';

@Injectable()
export class DabService {

    private currentUser: User | null = null;
    private currentCard: CreditCard | null = null;

    constructor(
        @Inject('DAB_LOG_REPOSITORY')
        private dabLogRepository: typeof DabLog,
        private readonly userService: UserService,
        private readonly creditCardService: CreditCardService,
        private readonly transactionService: TransactionService,
        private readonly accountService: AccountService,
        private readonly authService: AuthService,
    ) { }

  async login(cardNumber: string, pin: string) {
    const card = await this.creditCardService.findOneByCardNumberAndPin(cardNumber, pin);
    if (!card) {
      throw new UnauthorizedException('Numéro de carte ou PIN invalide');
    }

    const account = await this.accountService.findOne(card.accountId);
    if (!account) {
      throw new BadRequestException('Compte associé introuvable');
    }

    if (account.type === AccountType.LIVRETA) {
      throw new UnauthorizedException(
        "Les comptes de type 'Livret A' ne peuvent pas être utilisés pour le DAB",
      );
    }

    const user = await this.userService.findOne(account.userId);
    if (!user) {
      throw new BadRequestException(
        "L'utilisateur associé à la carte bleue est introuvable",
      );
    }

    this.currentUser = user;
    this.currentCard = card;

    const jwt = await this.authService.generateJwt(user.id);
    return { message: 'Connexion réussie', accessToken: jwt.accessToken };
  }

  async getAccountsBalance() {
    if (!this.currentUser) {
      throw new UnauthorizedException('Utilisateur non connecté');
    }

    const accounts = await this.accountService.findAllByUserId(
      this.currentUser.id,
    );
    return accounts.map((account) => ({
      id: account.id,
      balance: account.balance,
    }));
  }

  async getLastTransactions(accountId: number) {
    if (!this.currentUser) {
      throw new UnauthorizedException('Utilisateur non connecté');
    }

    const account = await this.accountService.findOne(accountId);
    if (!account || account.userId !== this.currentUser.id) {
      throw new BadRequestException(
        "Compte introuvable ou non associé à l'utilisateur",
      );
    }

    const transactions = await this.transactionService.findLastTransactions(accountId);

    return transactions;
  }

  async withdraw(accountId: number, amount: number) {
    if (!this.currentUser) {
      throw new UnauthorizedException('Utilisateur non connecté');
    }

    const account = await this.accountService.findOne(accountId);
    if (!account || account.userId !== this.currentUser.id) {
      throw new BadRequestException(
        "Compte introuvable ou non associé à l'utilisateur",
      );
    }

    if (amount > account.balance) {
      throw new BadRequestException('Solde insuffisant');
    }

    account.balance -= amount;
    await account.save();

    await this.transactionService.create({
      accountId: accountId,
      creditCardId: this.currentCard.id,
      type: TransactionType.WITHDRAW,
      amount: amount,
    });

    await this.createLog(this.currentUser.id, accountId, 'withdraw', amount);

    return {
      message: 'Retrait effectué avec succès',
      newBalance: account.balance,
    };
  }

  async createLog(
    userId: number,
    accountId: number,
    operationType: string,
    amount: number,
  ): Promise<DabLog> {
    const log = await this.dabLogRepository.create<DabLog>({
      userId,
      accountId,
      operationType,
      amount,
    });
    return log;
  }

  async findAllDabLog(): Promise<DabLog[]> {
    return this.dabLogRepository.findAll<DabLog>();
  }

  async findDabLogByUserId(userId: number): Promise<DabLog[]> {
    return this.dabLogRepository.findAll({
      where: { userId },
    });
  }

  async findDabLogByAccountId(accountId: number): Promise<DabLog[]> {
    return this.dabLogRepository.findAll({
      where: { accountId },
    });
  }
}
