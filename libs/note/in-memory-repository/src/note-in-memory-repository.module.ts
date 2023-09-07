import { Module } from '@nestjs/common';
import { InMemoryNoteRepository } from './repository/note.memory.repository';

@Module({
  providers: [InMemoryNoteRepository],
  exports: [InMemoryNoteRepository],
})
export class NoteInMemoryRepositoryModule {}
