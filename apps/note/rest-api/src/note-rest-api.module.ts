import { Module } from '@nestjs/common';
import { NoteInMemoryServiceProviderModule } from '@app/note/in-memory-service-provider';
import { NoteController } from './controller/note.controller';
import { AppController } from './controller/app.controller';

@Module({
  imports: [NoteInMemoryServiceProviderModule],
  controllers: [AppController, NoteController],
  providers: [],
})
export class NoteRestApiModule {}
