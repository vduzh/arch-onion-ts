import { Injectable } from '@nestjs/common';

import { Note } from '@app/note/core';
import { InMemoryRepository } from '@app/common/in-memory-repository';
import * as notes from './data/notes.json';

@Injectable()
export class NoteInMemoryRepository extends InMemoryRepository<Note, string> {
  constructor() {
    super(notes);
  }
}
