import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  databaseConfigFactory,
  getDatabaseConfig,
} from './config/database.config';
import { UsersModule } from './users/users.module';
import { CampaignModule } from './campaigns/campaigns.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfigFactory],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    UsersModule,
    CampaignModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
