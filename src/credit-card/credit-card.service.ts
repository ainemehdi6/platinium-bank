import { Inject, Injectable } from '@nestjs/common';
import { CreditCard } from './credit-card.entity';

@Injectable()
export class CreditCardService {
  constructor(
    @Inject('CREDITCARD_REPOSITORY')
    private creditCardRepository: typeof CreditCard,
  ) {}

  create(card: Partial<CreditCard>) {
    return this.creditCardRepository.create(card);
  }

  findOne(id: number) {
    return this.creditCardRepository.findOne({
      where: { id }
    });
  }

  findAll(): Promise<CreditCard[]> {
    return this.creditCardRepository.findAll<CreditCard>();
  }

  async update(id: number, updateCardDto: Partial<CreditCard>) {
    return this.creditCardRepository.update<CreditCard>(updateCardDto, {
      where: { id },
      returning: true,
    });
  }

  delete(id: number) {
    return this.creditCardRepository.destroy({
      where: { id },
    });
  }
}
