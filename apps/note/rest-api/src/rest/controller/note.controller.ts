import { BaseController } from '@app/common/rest-api';
import { Note, NoteService } from '@app/note/core';
import { Controller } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { NotePatchDto } from './dto/note-pacth.dto';

@Controller('notes')
export class NoteController extends BaseController<
  NoteDto,
  NotePatchDto,
  Note,
  string
> {
  constructor(protected readonly service: NoteService) {
    super(service);
  }

  public toDTO(model: Note): NoteDto {
    return { ...model };
  }

  public toModel(dto: NoteDto): Note {
    const res: Note = {
      id: dto.id,
      title: dto.title || '',
    };

    return res;
  }
}
