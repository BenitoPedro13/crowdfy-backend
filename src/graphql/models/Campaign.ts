import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from './User';

@Entity('campaigns')
@ObjectType()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  @Field({
    description: 'Unique Campaign Identifier',
    nullable: false,
  })
  id: string;

  @Column()
  @Field({
    description: 'Unique Identifier of the Campaign Creator User',
    nullable: false,
  })
  user_id: string;

  @ManyToOne(() => User, (user) => user?.campaigns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User, {
    description: 'Campaign Creator User',
    nullable: false,
  })
  user: Relation<User>;

  @Column()
  @Field({ description: 'Campaign Title', nullable: false })
  title: string;

  @Column()
  @Field({ description: 'Campaign Description', nullable: false })
  description: string;

  @Column({ nullable: true })
  @Field({ description: 'Campaign Banner Picture', nullable: true })
  bannerImage?: string;
}
