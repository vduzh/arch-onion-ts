import { NoteService } from '@app/note/core/application';
import { NoteInMemoryRepository } from '@app/note/infrastructure/in-memory-repository';

export const noteServiceProvider = {
  provide: NoteService,
  useFactory: (repositoryProvider: NoteInMemoryRepository) => {
    return new NoteService(repositoryProvider);
  },
  inject: [NoteInMemoryRepository],
};
