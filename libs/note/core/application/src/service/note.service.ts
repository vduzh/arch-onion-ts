import { Service } from '@app/common/core/application';
import { NoteDto } from './dto/note.dto';

/**
 * Notes business logic
 */
// NOTE: You cannot use interfaces since they are not present at runtime, but you can use an abstract class.
export abstract class NoteService extends Service<NoteDto, string> {}
