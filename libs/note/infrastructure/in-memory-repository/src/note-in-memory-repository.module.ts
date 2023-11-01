import { Module } from '@nestjs/common';
import { NoteRepositoryImpl } from './repository/note.repository.impl';
import { NoteDataSource } from './repository/note.data.source';

@Module({
  providers: [NoteDataSource, NoteRepositoryImpl],
  exports: [NoteDataSource, NoteRepositoryImpl],
})
export class NoteInMemoryRepositoryModule {}
