import { Injectable } from '@nestjs/common';

import { Note } from '@app/note/core';
import { InMemoryBaseRepostory } from '@app/common/in-memory-repository';
import * as notes from './data/notes.json';

@Injectable()
export class InMemoryNoteRepository extends InMemoryBaseRepostory<
  Note,
  string
> {
  constructor() {
    super(notes);
  }
}
