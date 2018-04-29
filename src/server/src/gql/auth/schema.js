export default `
  type Answer {
    data: User,
    status: Boolean,
    message: String,
    token: String
  }
  type Query {
    getUser(id: ID!): Answer,
  }
  type Mutation {
    registerUser(email: String, password: String): Answer
    loginUser(email: String, password: String): Answer
  }
`;