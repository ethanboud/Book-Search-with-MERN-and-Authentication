const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Int
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput{
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(input:UserInput): Auth!
    saveBook(input: BookInput!): User!
    removeBook(bookId: String!): User!
  }
`;

export default typeDefs;


// TODO: QUERY TYPE: 
// me: Which returns a User type.

// TODO: Mutation type:
// login: Accepts an email and password as parameters; returns an Auth type.
// addUser: Accepts a username, email, and password as parameters; returns an Auth type.
// saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
// removeBook: Accepts a book's bookId as a parameter; returns a User type.

// TODO: USER TYPE :
// _id

// username

// email

// bookCount

// savedBooks (This will be an array of the Book type.)

//  TODO: BOOK TYPE:
// bookId (Not the _id, but the book's id value returned from Google's Book API.)

// authors (An array of strings, as there may be more than one author.)

// description

// title

// image

// link

// TODO: AUTH TYPE:

// token

// user (References the User type.)