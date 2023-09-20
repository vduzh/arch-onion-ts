import { Module } from '@nestjs/common';
import { NoteResolver } from './resolvers/note.resolver';
import { NoteInMemoryServiceProviderModule } from '@app/note/in-memory-service-provider';

@Module({
  imports: [NoteInMemoryServiceProviderModule],
  controllers: [],
  providers: [NoteResolver],
})
export class GraphqlModule {}
