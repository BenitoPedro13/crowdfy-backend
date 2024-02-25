import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'User Name', nullable: false })
  name: string;

  @Field({ description: 'User Last Name', nullable: true })
  lastName?: string;

  @Field({ description: 'User Email', nullable: false })
  email: string;

  @Field({ description: 'User Password', nullable: false })
  password: string;

  @Field({ description: 'User Profile Picture', nullable: true })
  profilePicture?: string;
}
