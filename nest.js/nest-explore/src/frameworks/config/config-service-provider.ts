import { ConfigService } from './config.service';

export const ConfigServiceProvider = {
  provide: ConfigService,
  useValue: new ConfigService(
    `./config/${process.env.NODE_ENV || 'development'}.yaml`,
  ),
};
