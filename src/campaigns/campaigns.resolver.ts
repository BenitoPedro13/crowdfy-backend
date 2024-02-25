import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Campaign } from '../graphql/models/Campaign';
import { CreateCampaignInput } from './dtos/CreateCampaignInput';
import { CampaignService } from './campaigns.service';

@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(private campaignService: CampaignService) {}

  @Query(() => Campaign, {
    name: 'getCampaignByID',
    description: 'Get Campaign by ID',
    nullable: true,
  })
  getCampaignByID(
    @Args('id', {
      description: 'Campaign ID param',
      nullable: false,
    })
    id: string,
  ) {
    return this.campaignService.getCampaignById(id);
  }

  @Query(() => [Campaign], {
    description: 'Get Campaigns',
    nullable: true,
  })
  getCampaigns() {
    return this.campaignService.getCampaigns();
  }

  @Mutation(() => Campaign)
  createCampaign(
    @Args('createCampaignInput', { nullable: false })
    createCampaignInput: CreateCampaignInput,
  ) {
    return this.campaignService.createCampaign(createCampaignInput);
  }
}
