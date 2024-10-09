import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';
import { creditCardProviders } from './credit-card.providers';

@Module({
  controllers: [CreditCardController],
  providers: [CreditCardService, ...creditCardProviders],
})
export class CreditCardModule {}
