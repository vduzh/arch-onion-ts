import { BaseController } from '@app/common/rest-api';
import { Note, NoteService } from '@app/note/core';
import { Controller } from '@nestjs/common';
import { NoteDTO } from './dto/note.dto';

@Controller('notes')
export class NoteController extends BaseController<NoteDTO, Note, string> {
  public toDTO(model: Note): NoteDTO {
    return { ...model };
  }

  public toModel(dto: NoteDTO): Note {
    const res: Note = {
      id: dto.id,
      title: dto.title || '',
    };

    return res;
  }
  constructor(protected readonly service: NoteService) {
    super(service);
  }
}
