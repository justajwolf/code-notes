import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `./config/${process.env.NODE_ENV || 'development'}.yaml`,
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
