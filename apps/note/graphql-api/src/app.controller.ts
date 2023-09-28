import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async home(): Promise<string> {
    return Promise.resolve('GraphqlApi');
  }
}
