import { Campaign } from './models/Campaign';
import { User } from './models/User';

export const mockUsers: Partial<User>[] = [
  {
    id: '1',
    name: 'John Doe',
    // email: 'john@example.com',
  },
  {
    id: '2',
    name: 'Jane Smith',
    // email: 'jane@example.com',
  },
];

export const mockCampaigns: Partial<Campaign>[] = [
  {
    id: '1',
    user_id: '1', // Assigning a user_id to the campaign
    title: 'Spring Sale Campaign',
    description: 'Spring Sale Campaign',
    bannerImage: undefined,
  },
  {
    id: '2',
    user_id: '2', // Assigning a different user_id to another campaign
    title: 'Summer Promotion Campaign',
    description: 'Summer Promotion Campaign',
    bannerImage: undefined,
  },
];
