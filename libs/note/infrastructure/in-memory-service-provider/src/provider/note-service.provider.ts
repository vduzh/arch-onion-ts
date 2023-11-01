import { NoteService, NoteServiceImpl } from '@app/note/core/application';
import { NoteRepositoryImpl } from '@app/note/infrastructure/in-memory-repository';

export const noteServiceProvider = {
  provide: NoteService,
  useFactory: (repositoryProvider: NoteRepositoryImpl) => {
    return new NoteServiceImpl(repositoryProvider);
  },
  inject: [NoteRepositoryImpl],
};
