import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note as NoteDto } from '../types/note.type';
import { NoteInput } from '../types/note.input';
import { Note, NoteService } from '@app/note/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => NoteDto)
export class NoteResolver {
  constructor(private service: NoteService) {}

  //public abstract toDTO(model: M): D;
  public toDTO(model: Note): NoteDto | null {
    return model ? { ...model } : null;
  }

  //public abstract toModel(dto: D): M;
  public toModel(dto: NoteDto): Note | null {
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
    return (await this.service.find()).map((model) => this.toDTO(model));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => NoteDto, { nullable: true })
  async note(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<NoteDto | null> {
    return this.toDTO(await this.service.findById(id));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => NoteDto, { nullable: true })
  async saveNote(
    @Args({ name: 'note', type: () => NoteInput }) note: NoteInput,
  ): Promise<NoteDto | null> {
    // TODO: validate note input

    // Convert input into Dto
    const dto: NoteDto = { id: note.id, title: note.title || '' };
    // save dto
    return this.toDTO(await this.service.save(this.toModel(dto)));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => NoteDto, { nullable: true })
  async pacthNote(
    @Args({ name: 'note', type: () => NoteInput }) note: NoteInput,
  ): Promise<NoteDto | null> {
    // TODO: validate note input - check for id not null
    const id = note.id as string;

    // pacth the current dto
    const dto = { ...this.toDTO(await this.service.findById(id)), ...note };

    return this.toDTO(await this.service.save(this.toModel(dto)));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Boolean)
  async deleteNote(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.service.delete(id);
  }
}
