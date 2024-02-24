import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique User Identifier', nullable: false })
  id: string;

  @Field({ description: 'User Name', nullable: false })
  name: string;

  @Field({ description: 'User Last Name', nullable: true })
  lastName?: string;

  @Field({ description: 'Calculated User Full Name' })
  get fullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  @Field({ description: 'User Email', nullable: false })
  email: string;

  @Field({ description: 'User Password', nullable: false })
  password: string;

  @Field({ description: 'User Profile Picture', nullable: true })
  profilePicture?: string;
}
