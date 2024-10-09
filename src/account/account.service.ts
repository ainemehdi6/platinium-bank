import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account.entity';
@Injectable()
export class AccountService {
    constructor(
        @Inject('ACCOUNT_REPOSITORY')
        private accountRepository: typeof Account,
    ) { }

    async findAll(): Promise<Account[]> {
        return this.accountRepository.findAll();
    }
}
