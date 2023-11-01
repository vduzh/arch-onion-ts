import { Note } from '../model/note.model';

export class SomeNoteService {
  foo(from: Note, to: Note) {
    console.log(from, to);
  }
}
