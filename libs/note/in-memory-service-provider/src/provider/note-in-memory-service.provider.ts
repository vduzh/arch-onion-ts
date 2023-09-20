import { NoteService } from '@app/note/core';
import { NoteInMemoryRepository } from '@app/note/in-memory-repository';

export const noteServiceProvider = {
  provide: NoteService,
  useFactory: (repositoryProvider: NoteInMemoryRepository) => {
    return new NoteService(repositoryProvider);
  },
  inject: [NoteInMemoryRepository],
};
