import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { Campaign } from 'src/graphql/models/Campaign';
import { CampaignService } from 'src/campaigns/campaigns.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Campaign])],
  providers: [UserResolver, UserService, CampaignService],
})
export class UsersModule {}
