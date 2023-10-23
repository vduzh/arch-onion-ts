import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseType<K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID, { nullable: true })
  id?: K;
}
