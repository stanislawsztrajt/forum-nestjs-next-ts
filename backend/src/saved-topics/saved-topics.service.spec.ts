import { Test, TestingModule } from '@nestjs/testing';
import { SavedTopicsService } from './saved-topics.service';

describe('SavedTopicsService', () => {
  let service: SavedTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedTopicsService],
    }).compile();

    service = module.get<SavedTopicsService>(SavedTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
