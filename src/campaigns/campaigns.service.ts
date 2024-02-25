import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from 'src/graphql/models/Campaign';
import { CreateCampaignInput } from './dtos/CreateCampaignInput';
import { User } from 'src/graphql/models/User';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getCampaigns() {
    return this.campaignRepository.find({
      relations: ['user'],
    });
  }

  getCampaignById(id: string) {
    return this.campaignRepository.findOne({
      relations: ['user'],
      where: {
        id,
      },
    });
  }

  getCampaignsByUserId(user_id: string) {
    return this.campaignRepository.find({
      relations: ['user'],
      where: { user_id },
    });
  }

  async createCampaign(campaign: CreateCampaignInput) {
    const user = await this.userRepository.findOneBy({ id: campaign.user_id });
    if (!user) {
      throw new Error(
        'Could not create campaign, because the user_id provided does not exists',
      );
    }
    const newCampaign = this.campaignRepository.create(campaign);
    await this.campaignRepository.save(newCampaign);
    return await this.getCampaignById(newCampaign.id);
  }
}
