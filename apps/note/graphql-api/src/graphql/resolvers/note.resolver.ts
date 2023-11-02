import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from '../types/note.type';
import { NoteInput } from '../types/note.input';
import { BasicResolver } from '@app/common/infrastructure/graphql-api';
import { NoteService, NoteDto } from '@app/note/core/application';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => NoteDto)
export class NoteResolver extends BasicResolver<
  string,
  NoteDto,
  Note,
  NoteInput,
  NoteInput
> {
  constructor(protected service: NoteService) {
    super(service);
  }

  public typeToDto(t: Note): NoteDto | null {
    return t ? { id: t.id, title: t.title || '' } : null;
  }

  public inputToType(input: NoteInput): Note | null {
    if (!input) {
      return null;
    }

    return { ...input, title: input.title as string };
  }

  public dtoToType(dto: NoteDto): Note | null {
    return dto ? { ...dto, title: dto.title || '' } : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Note])
  async notes(): Promise<Note[]> {
    return this.list();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => Note, { nullable: true })
  async note(@Args('id', { type: () => ID }) id: string): Promise<Note | null> {
    return this.get(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Note, { nullable: true })
  async saveNote(
    @Args({ name: 'note', type: () => NoteInput }) note: NoteInput,
  ): Promise<Note | null> {
    // // TODO: validate note input
    return this.save(note);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Note, { nullable: true })
  async patchNote(
    @Args({ name: 'note', type: () => NoteInput }) note: NoteInput,
  ): Promise<Note | null> {
    // // TODO: validate note input - check for id not null
    // const id = note.id as string;
    return this.patch(note);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Boolean)
  async deleteNote(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.delete(id);
  }
}
