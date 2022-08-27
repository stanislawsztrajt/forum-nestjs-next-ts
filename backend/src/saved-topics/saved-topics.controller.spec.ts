import { Test, TestingModule } from '@nestjs/testing';
import { SavedTopicsController } from './saved-topics.controller';
import { SavedTopicsService } from './saved-topics.service';

describe('SavedTopicsController', () => {
  let controller: SavedTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedTopicsController],
      providers: [SavedTopicsService],
    }).compile();

    controller = module.get<SavedTopicsController>(SavedTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
