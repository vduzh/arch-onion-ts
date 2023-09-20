import { NestFactory } from '@nestjs/core';
import { GraphqlApiModule } from './graphql-api.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlApiModule);
  await app.listen(3001);
}
bootstrap();
