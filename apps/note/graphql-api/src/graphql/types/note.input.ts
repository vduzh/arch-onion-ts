import { InputType, Field } from '@nestjs/graphql';
import { BaseInput } from '@app/common/graphql-api';

@InputType()
export class NoteInput extends BaseInput<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  title?: string;
}
