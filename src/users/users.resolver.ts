import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { Campaign } from '../graphql/models/Campaign';
import { CreateUserInput } from './dtos/CreateUserInput';
import { UserService } from './users.service';
import { CampaignService } from 'src/campaigns/campaigns.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private campaignService: CampaignService,
  ) {}

  @Query(() => User, {
    name: 'getUserByID',
    description: 'Get User by ID',
    nullable: true,
  })
  getUserByID(
    @Args('id', {
      description: 'User ID param',
      nullable: false,
    })
    id: string,
  ) {
    return this.userService.getUserById(id, true);
  }

  @Query(() => [User], {
    description: 'Get Users',
    nullable: true,
  })
  getUsers() {
    return this.userService.getUsers();
  }

  @ResolveField(() => [Campaign], { name: 'campaigns', nullable: 'items' })
  getUserCampaigns(@Parent() user: User) {
    return this.campaignService.getCampaignsByUserId(user.id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput', { nullable: false })
    createUserInput: CreateUserInput,
  ) {
    return this.userService.createUser(createUserInput);
  }
}
