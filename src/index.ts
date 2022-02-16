import { ApolloServer } from 'apollo-server'; 
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { 
    createUserTable, 
    createProjectTable,
    createAssignmentTable, 
    listTables,
    addUser,
    addAssignment, 
    addProject, 
    getUsers,
    getUsersFromUsersTable, 
    getProjectsFromProjectsTable,
    getMembersFromTable,
    getAssignments,
    getProjects2 } from "./utils";
  

//addUser("Farah Bennis", "fbennis@zcorp.com", "bbc123");
//addProject ("Onboard New Developers","active");
//addAssignment("fbennis@zcorp.com", 3, "Farah Bennis");
//createUserTable();
//createProjectTable();
//createAssignmentTable();
//listTables();
//getUsersFromUsersTable();
//getUsers();
//getProjects();
//getAssignments();
//getMembersFromTable();
//getProjects();

const server = new ApolloServer({typeDefs, resolvers});

server.listen()
.then(
    ({url}:{url: String}) => { 
        console.log(`Server listening at ${url}`);
    })


