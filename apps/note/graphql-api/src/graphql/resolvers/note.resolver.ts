import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note as NoteDto } from '../types/note.type';
import { NoteInput } from '../types/note.input';
import { Note } from '@app/note/core/domain';
import { AbstarctResolver } from '@app/common/infrastructure/graphql-api';
import { NoteService } from '@app/note/core/application';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => NoteDto)
export class NoteResolver extends AbstarctResolver<
  NoteDto,
  Note,
  NoteInput,
  NoteInput,
  string
> {
  constructor(protected service: NoteService) {
    super(service);
  }

  public modelToDto(model: Note): NoteDto | null {
    return model ? { ...model } : null;
  }

  public inputToDto(input: NoteInput): NoteDto | null {
    return input
      ? {
          ...input,
          title: input.title as string,
        }
      : null;
  }

  public dtoToModel(dto: NoteDto): Note | null {
    if (!dto) {
      return null;
    }

    const res: Note = {
      id: dto.id,
      title: dto.title || '',
    };

    return res;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [NoteDto])
  async notes(): Promise<NoteDto[]> {
    return this.list();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => NoteDto, { nullable: true })
  async note(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<NoteDto | null> {
    return this.get(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => NoteDto, { nullable: true })
  async saveNote(
    @Args({ name: 'note', type: () => NoteInput }) note: NoteInput,
  ): Promise<NoteDto | null> {
    // // TODO: validate note input
    return this.save(note);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => NoteDto, { nullable: true })
  async pacthNote(
    @Args({ name: 'note', type: () => NoteInput }) note: NoteInput,
  ): Promise<NoteDto | null> {
    // // TODO: validate note input - check for id not null
    // const id = note.id as string;
    return this.pacth(note);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Boolean)
  async deleteNote(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.delete(id);
  }
}
