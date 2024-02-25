import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCampaignInput {
  @Field({ nullable: false })
  user_id: string;

  @Field({ nullable: false, defaultValue: '' })
  title: string;

  @Field({ nullable: false, defaultValue: '' })
  description: string;

  @Field({ nullable: true, defaultValue: null })
  bannerImage?: string;
}
