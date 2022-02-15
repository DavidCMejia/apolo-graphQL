import { users } from '../../database/mockdb';

export const resolvers = 
      {
        Query: {
          users: () => users,
        },
      };


