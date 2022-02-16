const dotenv = require('dotenv').config();
//const { Console } = require('console');
const { Client } = require('pg')

export const client = new Client({
    user: process.env.DB_USER,
    host:  process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,

  })

  

 

  // export const users = [
//         {
//             name: 'Octavio Flores',
//             email: 'oflores@zcorp.com',
//             projects: [{title: 'Site Upgrade - Summer 2021'}]
//         },
//         {
//             name: 'Farah Bennis',
//             email: 'fbennis@zcorp.com',
//             projects: [{title: 'Site Upgrade - Summer 2021',
//                         active:true}]
//         }
//     ];