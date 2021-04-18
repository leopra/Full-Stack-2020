const { ApolloServer, UserInputError, gql } = require('apollo-server')
require("dotenv").config()

const uuid = require('uuid/v1')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Book = require("./models/books")
const Author = require("./models/authors")

const url = process.env.MONGO_URI

const _countBy = require("lodash.countby")
const { collectFields } = require('graphql/execution/execute')

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

      // get bookCount, TODO bad way??
      const books = await Book.find({})
      const authorBooks = books.map((b) => b.author)
      const authorCounts = _countBy(authorBooks, (id) => id)

      const authorsObject = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: authorCounts[author.id] || null,
          id: author.id,
        }
      })

      return authorsObject
    },
  },


  Mutation: {
    addBook: async (root, args) => {
      try {
      let book
      let author = await Author.findOne({ name: args.author })

      if (author) {
        book = new Book({ ...args, author: author._id })
        await book.save()
      }

      if (!author) {
        const _id = mongoose.Types.ObjectId()
        book = new Book({ ...args, author: _id })

        author = new Author({
          name: args.author,
          _id,
        })

        await author.save()
        await book.save()
      }
      book = await Book.findOne({ title: args.title }).populate("author")
      return book
    }
    catch (error) {
      throw new UserInputError(error.message)
    }
    },

    editAuthor: async (root, args) => {
      try {
      const author = await Author.findOne({ name: args.name })
      if (!author) { return null }
      author.born = args.setBornTo
      await author.save()

      return author
      }
      catch (error) {
        throw new UserInputError(error.message)
      }
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
