import { BaseController } from '@app/common/rest-api';
import { Note, NoteService } from '@app/note/core';
import { Controller } from '@nestjs/common';

@Controller('notes')
export class NoteController extends BaseController<Note, string> {
  constructor(protected readonly service: NoteService) {
    super(service);
  }
}
