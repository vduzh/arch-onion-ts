import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';

@ObjectType()
export class Note extends BaseType<string> {
  @Field()
  title: string;
}
