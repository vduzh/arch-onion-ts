import { AbstractService } from '@app/common/core/application';
import { Note, NoteRepository } from '@app/note/core/domain';
import { NoteDto } from './dto/note.dto';

/**
 * Notes business logic
 */
export class NoteService extends AbstractService<NoteDto, Note, string> {
  constructor(protected repository: NoteRepository) {
    super(repository);
  }

  protected dtoToModel(dto: NoteDto): Note {
    return { id: dto.id, title: dto.title as string };
  }

  protected modelToDto(model: Note): NoteDto {
    return { ...model };
  }

  // async getNote(id: string): Promise<NoteDto | null> {
  //   const note = await this.repository.findById(id);
  //   return note ? Promise.resolve(this.modelToDto(note)) : null;
  // }

  // async getNotes(filter: Filter<string> = {}): Promise<NoteDto[]> {
  //   return this.repository.find(filter);
  // }

  /*
  async createNote(dto: NoteDto): Promise<NoteDto | ErrorDto> {
    // validate dto
    if (!dto.title) {
      return Promise.reject({ message: 'Title is required.' });
    }

    //if ('isValid') {
    // call Domain Service: PriceComputation - compute price and taxes
    // call Domain Service: NoteRepository - save the note
    // call Domain Service: InventoryService - update inventory
    // call Domain Service: CreditCardService - debit amount
    // call Domain Service: NoteRepository - update the note
    // call Domain Service: NotificationService - notify the user of completion
    //}
  }

  // async killNote(id: string): Promise<boolean> {
  //   return this.repository.delete(id);
  // }
   */
}
