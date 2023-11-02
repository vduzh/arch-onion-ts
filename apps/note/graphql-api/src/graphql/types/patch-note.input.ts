import { InputType, Field } from '@nestjs/graphql';
import { BasicInput } from '@app/common/infrastructure/graphql-api';

@InputType()
export class PatchNoteInput extends BasicInput<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => String, { nullable: true })
  title?: string;
}
