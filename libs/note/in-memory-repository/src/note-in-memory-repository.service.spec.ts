import { Test, TestingModule } from '@nestjs/testing';
import { NotesInMemoryRepositoryService } from './note-in-memory-repository.service';

describe('NotesInMemoryRepositoryService', () => {
  let service: NotesInMemoryRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesInMemoryRepositoryService],
    }).compile();

    service = module.get<NotesInMemoryRepositoryService>(
      NotesInMemoryRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
