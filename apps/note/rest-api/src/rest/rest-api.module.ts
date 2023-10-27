import { Module } from '@nestjs/common';
import { NoteInMemoryServiceProviderModule } from '@app/note/infrastructure/in-memory-service-provider';
import { NoteController } from './controller/note.controller';

@Module({
  imports: [NoteInMemoryServiceProviderModule],
  controllers: [NoteController],
  providers: [],
})
export class RestApiModule {}
