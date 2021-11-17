import { ConfigService } from '../config/config.service';
import { LOGGER } from './constant';
import * as LoggerService from './logger.service';

const factory = (configService: ConfigService) => {
  const logger = configService.get('LOGGER');
  if (LoggerService.hasOwnProperty(logger)) {
    return new LoggerService[logger](
      configService.get('APP_NAME'),
      configService,
    );
  } else {
    throw new ReferenceError(`The logger type ${logger} is not supported`);
  }
};
export const LoggerServiceProvider = {
  provide: LOGGER,
  useFactory: factory,
  inject: [ConfigService],
};
