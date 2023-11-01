import { Controller } from '@nestjs/common';
import { NoteService, NoteDto } from '@app/note/core/application';
import { BasicController } from '@app/common/infrastructure/rest-api';
import { NoteRestDto as Note } from './dto/note.rest-dto';
import { NoteRestPatchDTO as NotePatch } from './dto/note.rest-pacth-dto';

@Controller('notes')
export class NoteController extends BasicController<
  string,
  NoteDto,
  Note,
  NotePatch
> {
  constructor(protected readonly service: NoteService) {
    super(service);
  }

  public toRestDto(dto: NoteDto): Note {
    return { ...dto };
  }

  public toAppDto(res: Note): NoteDto {
    return {
      id: res.id,
      title: res.title || '',
    };
  }
}
