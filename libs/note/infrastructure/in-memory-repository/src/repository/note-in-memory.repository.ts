import { Injectable } from '@nestjs/common';

import * as notes from './data/notes.json';
import { InMemoryRepository } from '@app/common/infrastructure/in-memory-repository';
import { Note } from '@app/note/core/domain';

@Injectable()
export class NoteInMemoryRepository extends InMemoryRepository<Note, string> {
  constructor() {
    super(notes);
  }
}
