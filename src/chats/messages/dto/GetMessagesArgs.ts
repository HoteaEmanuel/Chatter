import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetMessagesArgs {
  @Field()
  @IsNotEmpty()
  chatId!: string;
}
