import { ApolloServer } from 'apollo-server'; 
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { client } from "../database/db";
import { createUserTable, listTables, addUser, getUsers } from "./utils";
  
// client.connect()
// client.query('SELECT NOW()', (err: any, res: any) => {
//     console.log(err, res)
//     client.end()
//   })
//addUser(3, "Oscar Perez", "elperez@zcorp.com", "cccc333");
//createUserTable();
//listTables();
getUsers();
const server = new ApolloServer({typeDefs, resolvers});

server.listen()
.then(
    ({url}:{url: String}) => { 
        console.log(`Server listening at ${url}`);
    })


