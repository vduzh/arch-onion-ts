import { Module } from '@nestjs/common';
import { noteServiceProvider } from './provider/note-in-memory-service.provider';
import { NoteInMemoryRepositoryModule } from '@app/note/in-memory-repository';

@Module({
  imports: [NoteInMemoryRepositoryModule],
  providers: [noteServiceProvider],
  exports: [noteServiceProvider],
})
export class NoteInMemoryServiceProviderModule {}
