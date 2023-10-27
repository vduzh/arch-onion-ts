import { Field, ObjectType } from '@nestjs/graphql';
import { BasicType } from '@app/common/infrastructure/graphql-api';

@ObjectType()
export class Note extends BasicType<string> {
  @Field()
  title: string;
}
