import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account.entity';
import { CreditCardService } from 'src/credit-card/credit-card.service';
@Injectable()
export class AccountService {
    constructor(
        @Inject('ACCOUNT_REPOSITORY')
        private accountRepository: typeof Account,
        private creditCardService: CreditCardService,
    ) { }

    async findAll(): Promise<Account[]> {
        return this.accountRepository.findAll<Account>();
      }
    
      async create(card: Partial<Account>) {
        return this.accountRepository.create(card);
      }
    
      async findOne(id: number) {
        return this.accountRepository.findOne({
          where: { id }
        });
      }
    
      async update(id: number, updateCardDto: Partial<Account>) {
        return this.accountRepository.update<Account>(updateCardDto, {
          where: { id },
          returning: true,
        });
      }
    
      async delete(id: number) {
        return this.accountRepository.destroy({
          where: { id },
        });
      }

      async findAllByUserId(userId: number): Promise<Account[]> {
        const accounts = await this.accountRepository.findAll({
            where: { userId }
        });

        if (!accounts || accounts.length === 0) {
            throw new NotFoundException(`Aucun compte trouvé pour l'utilisateur avec l'ID ${userId}`);
        }

        return accounts;
    }
}
