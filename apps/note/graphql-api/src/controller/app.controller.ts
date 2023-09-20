import { NoteService } from '@app/note/core';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(protected readonly service: NoteService) {}

  @Get()
  async getHello(): Promise<string> {
    console.log(await this.service.find());
    return Promise.resolve('GraphqlApi');
  }
}
