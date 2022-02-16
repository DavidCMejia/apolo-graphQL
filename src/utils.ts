import { pool } from "../database/db";
import { v4 as uuidv4 } from "uuid";

interface User { //tipado de User en BD
    id: string
    name: string
    email: string
    password: string
    
}

export const readQuery = async (query: string) => {
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (err) {
        console.error(err);
    } 
}

export const findUserByEmail = async (email: string) => {
    const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
    }

    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (err) {
        console.error(err);
    }
    return [{
        id: '0',
        name: "J Doe",
        email: 'jdoe@zcorp.com',
        password: 'passwordz'
    }]
}

export const addUser = async (name: string, email: string, password: string) => {    
    const query = {
        text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)',
        values: [uuidv4(), name, email, password],
    }       
    
    const userQuery = await findUserByEmail(email);
    if (userQuery?.length === 0) {
        try {
            const res = await pool.query(query);
            console.log("User added.");
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log("Unable to add user. Check your email address");
    }
}

export const addProject = async (title: string, status: string) => {
    const query = {
        text: 'INSERT INTO projects(title, status) VALUES($1, $2)',
        values: [title, status],
    }

    try {
        const res = await pool.query(query);
        console.log("Project added.");
    } catch (err) {
        console.error(err);
    } 
}

export const addAssignment = async (user_email: string, project_id: number, user_name: string) => {
    let user_id: string = '';
    const user = await findUserByEmail(user_email);
    if (user?.length === 0) {
        console.log("User with email: "+user_email+ " not found.")
    } else {
      user_id = user[0].id;  
    }

    const query = {
        text: 'INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)',
        values: [project_id, user_id, user_name],
    }

    try {
        const res = await pool.query(query);
        console.log('Assignment created.');
    } catch (err) {
        console.error(err);
    } 
}

export const getUsersFromUsersTable = async () => {
    const query = `
    SELECT * FROM users;
    `;
    const res = await pool.query(query);
    //console.log(res.rows)
    return readQuery(query);
    
}

export const getUsers = async () => {
    const usersFromUsersTable = await getUsersFromUsersTable();
    console.log(usersFromUsersTable)
    const assignments = await getAssignments();
    const users = await usersFromUsersTable?.map(async (user: { id: any; name: any; email: any; }) => {
        let projects: object [] = [];
        await assignments?.forEach((assignment: { user_id: any; project_id: any; title: any; status: any; }) => {
            if (user.id === assignment.user_id) {
                projects.push({
                   id: assignment.project_id,
                   title: assignment.title,
                   status: assignment.status 
                });
            }
        })
        console.log(projects)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            projects: projects,
        }
    })
    return users;   
}

export const getProjects = async () => {
    const query=`
    SELECT * FROM projects;
    `
    try {const res = await pool.query(query);
        console.log(res.rows)
        return res.rows
     } catch (err) {
        console.error(err)  
    }
}

export const getAssignments = async () => {
    const query = `
    SELECT assignments.user_id, users.name, assignments.project_id, projects.title, projects.status 
    FROM ((users
    INNER JOIN assignments
    ON users.id = assignments.user_id)
    INNER JOIN projects
    ON assignments.project_id = projects.id);
    `;
    const res = await pool.query(query);
    console.log(res.rows)  
    return readQuery(query);
}

export const createUserTable = async () => {
    const query = `
    CREATE TABLE users (
        id varchar primary key,
        name varchar,
        email varchar,
        password varchar

)
`;
        return readQuery(query);
}

export const createProjectTable = async () => {
//id serial siginifica auto increment
    const query = `
    CREATE TABLE projects (
        id serial primary key, 
        title varchar,
        status varchar
    )
    `;

    return await readQuery(query) ? "Table created." : "Unable to create table.";
}

export const createAssignmentTable = async () => {
    // se asocia projects con users
    const query = `
    CREATE TABLE assignments (
        id serial,
        project_id int references projects (id),
        user_id varchar references users (id),
        primary key (project_id, user_id),
        user_name varchar
    )
    `;

    return await readQuery(query) ? "Table created" : "Unable to create table.";
}

export const listTables = async () =>{
    const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
`
try {const res = await pool.query(query);
    console.log(res.rows);
    return(res.rows);
} catch (error) {
    console.error(error);
} 

}