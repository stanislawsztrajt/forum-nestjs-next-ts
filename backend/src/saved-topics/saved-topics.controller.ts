import { Controller } from '@nestjs/common';
import { SavedTopicsService } from './saved-topics.service';

@Controller('saved-topics')
export class SavedTopicsController {
  constructor(private readonly savedTopicsService: SavedTopicsService) {}
}
