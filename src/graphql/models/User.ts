import { Field, ObjectType } from '@nestjs/graphql';
import { Campaign } from './Campaign';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Unique User Identifier', nullable: false })
  id: string;

  @Column()
  @Field({ description: 'User Name', nullable: false })
  name: string;

  @Column({ nullable: true })
  @Field({ description: 'User Last Name', nullable: true })
  lastName?: string;

  // @Column({ nullable: true })
  @Field({ description: 'Calculated User Full Name', nullable: true })
  get fullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  @Column({ unique: true })
  @Field({ description: 'User Email', nullable: false })
  email: string;

  @Column()
  @Field({ description: 'User Password', nullable: false })
  password: string;

  @Column({ nullable: true })
  @Field({ description: 'User Profile Picture', nullable: true })
  profilePicture?: string;

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  @Field(() => [Campaign], {
    description: 'User Created Campaigns',
    nullable: 'items',
  })
  campaigns?: Relation<Campaign>[];
}
