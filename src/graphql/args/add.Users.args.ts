import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddUserArgs {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
