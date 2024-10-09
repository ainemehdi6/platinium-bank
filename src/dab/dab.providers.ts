import { DabLog } from './dab.entity';

export const dabProviders = [
  {
    provide: 'DAB_LOG_REPOSITORY',
    useValue: DabLog,
  },
];
