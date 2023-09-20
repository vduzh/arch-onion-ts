import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { NoteInMemoryServiceProviderModule } from '@app/note/in-memory-service-provider';

@Module({
  imports: [NoteInMemoryServiceProviderModule],
  controllers: [AppController],
  providers: [],
})
export class GraphqlApiModule {}
