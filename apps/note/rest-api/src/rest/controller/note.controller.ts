import { Controller } from '@nestjs/common';
import { Note } from '@app/note/core/domain';
import { NoteService } from '@app/note/core/application';
import { AbstractController } from '@app/common/infrastructure/rest-api';
import { NoteDto } from './dto/note.dto';
import { NotePatchDto } from './dto/note-pacth.dto';

@Controller('notes')
export class NoteController extends AbstractController<
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
