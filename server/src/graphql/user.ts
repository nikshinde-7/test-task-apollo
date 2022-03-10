import { AuthenticationError } from 'apollo-server-errors';
import {
  createUser,
  getUsers,
  loginUser,
  getUserByToken,
  deleteUserByEmail,
} from '../controllers/user.controller';
import { ICreateUser, ILogin } from '../interfaces/User';

const userTypeDef = `
type User {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String
}

type CreatedUser {
  id: ID!,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String
}
extend type Query {
    users: [CreatedUser]
    getUserByToken: CreatedUser
}
extend type Mutation {
    createUser(  firstName:String!,
      lastName:String!,
      email:String!,
      phoneNumber:String!,
      password:String!): AuthPayLoad!
    login(   email: String!,
      password: String!): AuthPayLoad!
      
      deleteUserById(id: ID!): CreatedUser
      deleteUserByEmail(email: String!): CreatedUser
}

input UserCreateInput {
  firstName:String!
  lastName:String!
  email:String!
  phoneNumber:String!
  password:String!
  }
  input UserLoginInput {
    email: String!
    password: String!
  }
  type AuthPayLoad {
    token: String!
  }
`;

const userResolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You must be logged in');
      // }
      return await getUsers();
    },
    getUserByToken: async (parent: any, args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      return context.user;
    },
  },
  Mutation: {
    createUser: async (parent: any, args: ICreateUser) => {
      return createUser(args);
    },
    login: async (parent: any, args: ILogin) => {
      return loginUser(args);
    },
    deleteUserById: async (parent: any, args: any) => {
      return false;
    },

    deleteUserByEmail: async (parent: any, args: any) => {
      console.log('args', args);
      return deleteUserByEmail(args.email);
    },
  },
};

export { userTypeDef, userResolvers };
