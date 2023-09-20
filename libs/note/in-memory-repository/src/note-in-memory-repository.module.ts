import { Module } from '@nestjs/common';
import { NoteInMemoryRepository } from './repository/note-in-memory.repository';

@Module({
  providers: [NoteInMemoryRepository],
  exports: [NoteInMemoryRepository],
})
export class NoteInMemoryRepositoryModule {}
