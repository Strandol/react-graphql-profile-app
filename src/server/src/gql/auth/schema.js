export default `
  type Answer {
    data: User,
    status: Boolean,
    message: String,
    token: String
  }
  type Query {
    getUser(id: ID!): Answer,
    loginUser(email: String, password: String): Answer
  }
  type Mutation {
    registerUser(email: String, password: String): Answer
  }
`;