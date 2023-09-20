import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RestApiModule } from './rest/rest-api.module';

@Module({
  imports: [RestApiModule],
  controllers: [AppController],
  providers: [],
})
export class NoteRestApiModule {}
