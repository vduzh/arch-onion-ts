import { Injectable } from '@nestjs/common';

import { RepositoryImpl } from '@app/common/infrastructure/in-memory-repository';
import { Note, NoteRepository } from '@app/note/core/domain';
import { NoteDataSource } from './note.data.source';

@Injectable()
export class NoteRepositoryImpl
  extends RepositoryImpl<Note, string>
  implements NoteRepository
{
  constructor(protected readonly ds: NoteDataSource) {
    super(ds);
  }
}
