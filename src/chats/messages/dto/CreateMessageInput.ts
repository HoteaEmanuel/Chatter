import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  content!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  chatId!: string;
}
