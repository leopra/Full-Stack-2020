const { ApolloServer, UserInputError, gql } = require('apollo-server')
require("dotenv").config()

const uuid = require('uuid/v1')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Book = require("./models/books")
const Author = require("./models/authors")

const url = process.env.MONGO_URI;

const mongoUrl = url
console.log('connecting to', mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    bookCount: Int
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      genres: [String]
      published: Int
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
  }  
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    
    allBooks: async (root, args) => {
      if (args.author) { 
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({
            author: { $in: author.id } 
        }).populate("author")
        return books
      }
      else if (args.genre) {
        const books = await Book.find({
            genres: { $in: args.genre }
        }).populate("author")
        return books
      }
      else { return Book.find({}).populate("author") }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const authorsObject = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          //bookCount: author.books.length, TODO find solution for this
          id: author.id,
        }
      })

      return authorsObject;
    },
  },


  Mutation: {
    addBook: (root, args) => {
      if (books.find(p => p.title === args.title)) {
        throw new UserInputError('Title must be unique')
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) { return null }
      author.born = args.setBornTo
      await author.save();

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})




server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
