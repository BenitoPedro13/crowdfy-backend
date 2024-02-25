import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignResolver } from './campaigns.resolver';
import { Campaign } from 'src/graphql/models/Campaign';
import { CampaignService } from './campaigns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [CampaignResolver, CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
