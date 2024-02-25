import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { CampaignModule } from 'src/campaigns/campaigns.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CampaignModule],
  providers: [UserResolver, UserService],
})
export class UsersModule {}
