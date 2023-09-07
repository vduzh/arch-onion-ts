import { NoteService } from '@app/note/core';
import { Module } from '@nestjs/common';
import { InMemoryNoteRepository } from '@app/note/in-memory-repository';
import { NoteController } from './controller/note.controller';
import { AppController } from './controller/app.controller';

const noteServiceProvider = {
  provide: NoteService,
  useFactory: (repositoryProvider: InMemoryNoteRepository) => {
    return new NoteService(repositoryProvider);
  },
  inject: [InMemoryNoteRepository],
};

@Module({
  imports: [],
  controllers: [AppController, NoteController],
  providers: [InMemoryNoteRepository, noteServiceProvider],
})
export class NoteRestApiModule {}
