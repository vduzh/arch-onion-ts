import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from '@app/common/graphql-api';

@ObjectType()
export class Note extends BaseType<string> {
  @Field()
  title: string;
}
