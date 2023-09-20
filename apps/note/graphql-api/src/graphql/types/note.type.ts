import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Note {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID, { nullable: true })
  id?: string;

  @Field()
  title: string;
}
