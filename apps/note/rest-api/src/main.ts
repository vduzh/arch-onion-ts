import { NestFactory } from '@nestjs/core';
import { NoteRestApiModule } from './note-rest-api.module';

async function bootstrap() {
  const app = await NestFactory.create(NoteRestApiModule);
  await app.listen(3000);
}
bootstrap();
