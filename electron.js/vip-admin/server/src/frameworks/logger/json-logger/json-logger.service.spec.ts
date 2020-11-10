import { Test, TestingModule } from '@nestjs/testing';
import { JsonLoggerService } from './json-logger.service';

describe('JsonLoggerService', () => {
  let service: JsonLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLoggerService],
    }).compile();

    service = module.get<JsonLoggerService>(JsonLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
