import { Module } from '@nestjs/common';
import { NoteController } from './controller/note.controller';
import { NoteInMemoryServiceProviderModule } from '@app/note/infrastructure/in-memory-service-provider';

@Module({
  imports: [NoteInMemoryServiceProviderModule],
  controllers: [NoteController],
  providers: [],
})
export class RestApiModule {}
