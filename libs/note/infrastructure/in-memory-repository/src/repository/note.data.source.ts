import * as notes from './data/notes.json';
import { DataSource } from '@app/common/infrastructure/in-memory-repository';
import { Note } from '@app/note/core/domain';
import { Injectable } from '@nestjs/common';

/**
 * TBD
 */
@Injectable()
export class NoteDataSource extends DataSource<Note> {
  constructor() {
    super('notes', notes);
  }
}
