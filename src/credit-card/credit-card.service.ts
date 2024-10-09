import { Inject, Injectable } from '@nestjs/common';
import { CreditCard } from './credit-card.entity';

@Injectable()
export class CreditCardService {
  constructor(
    @Inject('CREDITCARD_REPOSITORY')
    private creditCardRepository: typeof CreditCard,
  ) {}

  async create(card: Partial<CreditCard>) {
    return this.creditCardRepository.create(card);
  }

  async findOne(id: number) {
    return this.creditCardRepository.findOne({
      where: { id }
    });
  }

  async findAll(): Promise<CreditCard[]> {
    return this.creditCardRepository.findAll<CreditCard>();
  }

  async update(id: number, updateCardDto: Partial<CreditCard>) {
    return this.creditCardRepository.update<CreditCard>(updateCardDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number) {
    return this.creditCardRepository.destroy({
      where: { id },
    });
  }

  async findOneByCardNumberAndPin(cardNumber: string, pin: string): Promise<CreditCard | null> {
    return CreditCard.findOne({ where: { cardNumber, pin } });
  }
}
