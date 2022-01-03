const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

// Example schema
const schema = buildSchema(`
  type User {
    id: String
    name: String
    job_title: String
    email: String
    state: Boolean
    location: String
  }

  type UserStateInfo {
    name: String
    email: String
  }

  type Query {
    getUsers: [User]
    getUserInfoById(id: Int) : User
    getUsersByState(state: Boolean) : [UserStateInfo]
  }

  type Mutation {
    updateUserInfo(id: Int, name: String, email: String, job_title: String, email: String, state: Boolean, location: String) : Boolean,
    createUser(name: String, email: String, job_title: String, state: Boolean, location: String) : Boolean,
    deleteUser(id: Int) : Boolean,
    updateUserState(id: Int, state: Boolean) : Boolean
  }
`);

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err) {
            console.log(err);
            return reject(err);
        }
        console.log(rows);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

// Example queries
const root = {
  getUsers: (args, req) => queryDB(req, "select * from users").then(data => data),
  getUserInfoById: (args, req) => queryDB(req, "select * from users where id = ?", [args.id]).then(data => data[0]),
  getUsersByState: (args, req) => queryDB(req, "select name, email from users where state = ?", [args.state]).then(data => data),
  updateUserInfo: (args, req) => queryDB(req, "update users SET ? where id = ?", [args, args.id]).then(data => data),
  createUser: (args, req) => queryDB(req, "insert into users SET ?", args).then(data => data),
  deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data),
  updateUserState: (args, req) => queryDB(req, "update users SET ? where id = ?", [args.state, args.id]).then(data => data),
};

// Default database values. Use .env file for specific configs
app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'testuser_db'
  });
  req.mysqlDb.connect();
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');