import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note as NoteDto } from '../types/note.type';
import { NoteInput } from '../types/note.input';
import { NoteService } from '@app/note/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => NoteDto)
export class NoteResolver {
  constructor(private service: NoteService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [NoteDto!])
  async notes(): Promise<NoteDto[]> {
    return Promise.resolve([...(await this.service.find())]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => NoteDto)
  async note(@Args('id', { type: () => ID }) id: string): Promise<NoteDto> {
    return { ...(await this.service.findById(id)) };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => NoteDto)
  async addNote(
    @Args({ name: 'note', type: () => NoteInput }) note: NoteInput,
  ) {
    const saved = await this.service.save({ id: undefined, title: note.title });
    return { ...saved };
  }
}
