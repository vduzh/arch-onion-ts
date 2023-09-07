import { Note } from '../model/note.model';

export class SomeService {
  foo(from: Note, to: Note) {
    console.log(from, to);
  }
}
