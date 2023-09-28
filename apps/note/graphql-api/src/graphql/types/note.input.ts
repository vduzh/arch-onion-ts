import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class NoteInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID, { nullable: true })
  id?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  title?: string;
}
