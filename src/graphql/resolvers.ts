import { getUsers } from "../utils";

export const resolvers = 
      {
        Query: {
          users: () => getUsers(),
        //  user: (root, args) => {
        //    const user = users.find(user => user.id === args.id)
        },
      };


