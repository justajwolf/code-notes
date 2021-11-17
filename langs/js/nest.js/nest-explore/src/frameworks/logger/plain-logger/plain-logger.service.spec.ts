import { Test, TestingModule } from '@nestjs/testing';
import { PlainLoggerService } from './plain-logger.service';

describe('PlainLoggerService', () => {
  let service: PlainLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlainLoggerService],
    }).compile();

    service = module.get<PlainLoggerService>(PlainLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
