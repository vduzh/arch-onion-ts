import { GenericService } from '@app/common/core/application';
import { Note, NoteRepository } from '@app/note/core/domain';
/**
 * The Service layer holds interfaces with common operations, such as Add, Save, Edit, and Delete.
 * Also, this layer is used to communicate between the UI layer and repository layer.
 * The Service layer also could hold business logic for an entity. In this layer,
 * service interfaces are kept separate from its implementation, keeping loose coupling and
 * separation of concerns in mind.
 */
export class NoteService extends GenericService<Note, string> {
  constructor(public repository: NoteRepository | null) {
    super(repository);
  }

  createNote(note: Note): Promise<Note> | null {
    // validate Note

    if ('isValid') {
      // call Domain Service: PriceComputation - compute price and taxes
      // call Domain Service: NoteRepository - save the note
      // call Domain Service: InventoryService - update inventory
      // call Domain Service: CreditCardService - debit amount
      // call Domain Service: NoteRepository - update the note
      // call Domain Service: NotificationService - notify the user of completion
      // return Result with Successful
    }

    // return Result with failure
    return null;
  }

  execSomeUseCase(note: Note): void {
    // mark the note as complete in the DB
    console.log(note, 'complete');
    // send the comfirmation e-mail
    console.log(note, 'confirmed');
  }
}
