module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateBrick {
  count: Int!
}

type AggregateConcept {
  count: Int!
}

type AggregateReview {
  count: Int!
}

type AggregateSource {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Brick {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
  author: User!
  source: Source!
  parentConcept: Concept!
  childrenConcepts(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Concept!]
}

type BrickConnection {
  pageInfo: PageInfo!
  edges: [BrickEdge]!
  aggregate: AggregateBrick!
}

input BrickCreateInput {
  id: ID
  content: String!
  author: UserCreateOneInput!
  source: SourceCreateOneInput!
  parentConcept: ConceptCreateOneInput!
  childrenConcepts: ConceptCreateManyInput
}

type BrickEdge {
  node: Brick!
  cursor: String!
}

enum BrickOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  content_ASC
  content_DESC
}

type BrickPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String!
}

type BrickSubscriptionPayload {
  mutation: MutationType!
  node: Brick
  updatedFields: [String!]
  previousValues: BrickPreviousValues
}

input BrickSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BrickWhereInput
  AND: [BrickSubscriptionWhereInput!]
  OR: [BrickSubscriptionWhereInput!]
  NOT: [BrickSubscriptionWhereInput!]
}

input BrickUpdateInput {
  content: String
  author: UserUpdateOneRequiredInput
  source: SourceUpdateOneRequiredInput
  parentConcept: ConceptUpdateOneRequiredInput
  childrenConcepts: ConceptUpdateManyInput
}

input BrickUpdateManyMutationInput {
  content: String
}

input BrickWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  author: UserWhereInput
  source: SourceWhereInput
  parentConcept: ConceptWhereInput
  childrenConcepts_every: ConceptWhereInput
  childrenConcepts_some: ConceptWhereInput
  childrenConcepts_none: ConceptWhereInput
  AND: [BrickWhereInput!]
  OR: [BrickWhereInput!]
  NOT: [BrickWhereInput!]
}

input BrickWhereUniqueInput {
  id: ID
}

type Concept {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

type ConceptConnection {
  pageInfo: PageInfo!
  edges: [ConceptEdge]!
  aggregate: AggregateConcept!
}

input ConceptCreateInput {
  id: ID
  name: String!
}

input ConceptCreateManyInput {
  create: [ConceptCreateInput!]
  connect: [ConceptWhereUniqueInput!]
}

input ConceptCreateOneInput {
  create: ConceptCreateInput
  connect: ConceptWhereUniqueInput
}

type ConceptEdge {
  node: Concept!
  cursor: String!
}

enum ConceptOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type ConceptPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

input ConceptScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [ConceptScalarWhereInput!]
  OR: [ConceptScalarWhereInput!]
  NOT: [ConceptScalarWhereInput!]
}

type ConceptSubscriptionPayload {
  mutation: MutationType!
  node: Concept
  updatedFields: [String!]
  previousValues: ConceptPreviousValues
}

input ConceptSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ConceptWhereInput
  AND: [ConceptSubscriptionWhereInput!]
  OR: [ConceptSubscriptionWhereInput!]
  NOT: [ConceptSubscriptionWhereInput!]
}

input ConceptUpdateDataInput {
  name: String
}

input ConceptUpdateInput {
  name: String
}

input ConceptUpdateManyDataInput {
  name: String
}

input ConceptUpdateManyInput {
  create: [ConceptCreateInput!]
  update: [ConceptUpdateWithWhereUniqueNestedInput!]
  upsert: [ConceptUpsertWithWhereUniqueNestedInput!]
  delete: [ConceptWhereUniqueInput!]
  connect: [ConceptWhereUniqueInput!]
  set: [ConceptWhereUniqueInput!]
  disconnect: [ConceptWhereUniqueInput!]
  deleteMany: [ConceptScalarWhereInput!]
  updateMany: [ConceptUpdateManyWithWhereNestedInput!]
}

input ConceptUpdateManyMutationInput {
  name: String
}

input ConceptUpdateManyWithWhereNestedInput {
  where: ConceptScalarWhereInput!
  data: ConceptUpdateManyDataInput!
}

input ConceptUpdateOneRequiredInput {
  create: ConceptCreateInput
  update: ConceptUpdateDataInput
  upsert: ConceptUpsertNestedInput
  connect: ConceptWhereUniqueInput
}

input ConceptUpdateWithWhereUniqueNestedInput {
  where: ConceptWhereUniqueInput!
  data: ConceptUpdateDataInput!
}

input ConceptUpsertNestedInput {
  update: ConceptUpdateDataInput!
  create: ConceptCreateInput!
}

input ConceptUpsertWithWhereUniqueNestedInput {
  where: ConceptWhereUniqueInput!
  update: ConceptUpdateDataInput!
  create: ConceptCreateInput!
}

input ConceptWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [ConceptWhereInput!]
  OR: [ConceptWhereInput!]
  NOT: [ConceptWhereInput!]
}

input ConceptWhereUniqueInput {
  id: ID
  name: String
}

scalar DateTime

scalar Long

type Mutation {
  createBrick(data: BrickCreateInput!): Brick!
  updateBrick(data: BrickUpdateInput!, where: BrickWhereUniqueInput!): Brick
  updateManyBricks(data: BrickUpdateManyMutationInput!, where: BrickWhereInput): BatchPayload!
  upsertBrick(where: BrickWhereUniqueInput!, create: BrickCreateInput!, update: BrickUpdateInput!): Brick!
  deleteBrick(where: BrickWhereUniqueInput!): Brick
  deleteManyBricks(where: BrickWhereInput): BatchPayload!
  createConcept(data: ConceptCreateInput!): Concept!
  updateConcept(data: ConceptUpdateInput!, where: ConceptWhereUniqueInput!): Concept
  updateManyConcepts(data: ConceptUpdateManyMutationInput!, where: ConceptWhereInput): BatchPayload!
  upsertConcept(where: ConceptWhereUniqueInput!, create: ConceptCreateInput!, update: ConceptUpdateInput!): Concept!
  deleteConcept(where: ConceptWhereUniqueInput!): Concept
  deleteManyConcepts(where: ConceptWhereInput): BatchPayload!
  createReview(data: ReviewCreateInput!): Review!
  updateReview(data: ReviewUpdateInput!, where: ReviewWhereUniqueInput!): Review
  updateManyReviews(data: ReviewUpdateManyMutationInput!, where: ReviewWhereInput): BatchPayload!
  upsertReview(where: ReviewWhereUniqueInput!, create: ReviewCreateInput!, update: ReviewUpdateInput!): Review!
  deleteReview(where: ReviewWhereUniqueInput!): Review
  deleteManyReviews(where: ReviewWhereInput): BatchPayload!
  createSource(data: SourceCreateInput!): Source!
  updateSource(data: SourceUpdateInput!, where: SourceWhereUniqueInput!): Source
  updateManySources(data: SourceUpdateManyMutationInput!, where: SourceWhereInput): BatchPayload!
  upsertSource(where: SourceWhereUniqueInput!, create: SourceCreateInput!, update: SourceUpdateInput!): Source!
  deleteSource(where: SourceWhereUniqueInput!): Source
  deleteManySources(where: SourceWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  brick(where: BrickWhereUniqueInput!): Brick
  bricks(where: BrickWhereInput, orderBy: BrickOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Brick]!
  bricksConnection(where: BrickWhereInput, orderBy: BrickOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BrickConnection!
  concept(where: ConceptWhereUniqueInput!): Concept
  concepts(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Concept]!
  conceptsConnection(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConceptConnection!
  review(where: ReviewWhereUniqueInput!): Review
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review]!
  reviewsConnection(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReviewConnection!
  source(where: SourceWhereUniqueInput!): Source
  sources(where: SourceWhereInput, orderBy: SourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Source]!
  sourcesConnection(where: SourceWhereInput, orderBy: SourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SourceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Review {
  id: ID!
  createdAt: DateTime!
  author: User!
  content: String!
}

type ReviewConnection {
  pageInfo: PageInfo!
  edges: [ReviewEdge]!
  aggregate: AggregateReview!
}

input ReviewCreateInput {
  id: ID
  author: UserCreateOneInput!
  content: String!
}

type ReviewEdge {
  node: Review!
  cursor: String!
}

enum ReviewOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  content_ASC
  content_DESC
}

type ReviewPreviousValues {
  id: ID!
  createdAt: DateTime!
  content: String!
}

type ReviewSubscriptionPayload {
  mutation: MutationType!
  node: Review
  updatedFields: [String!]
  previousValues: ReviewPreviousValues
}

input ReviewSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ReviewWhereInput
  AND: [ReviewSubscriptionWhereInput!]
  OR: [ReviewSubscriptionWhereInput!]
  NOT: [ReviewSubscriptionWhereInput!]
}

input ReviewUpdateInput {
  author: UserUpdateOneRequiredInput
  content: String
}

input ReviewUpdateManyMutationInput {
  content: String
}

input ReviewWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  author: UserWhereInput
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  AND: [ReviewWhereInput!]
  OR: [ReviewWhereInput!]
  NOT: [ReviewWhereInput!]
}

input ReviewWhereUniqueInput {
  id: ID
}

type Source {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

type SourceConnection {
  pageInfo: PageInfo!
  edges: [SourceEdge]!
  aggregate: AggregateSource!
}

input SourceCreateInput {
  id: ID
  name: String!
}

input SourceCreateOneInput {
  create: SourceCreateInput
  connect: SourceWhereUniqueInput
}

type SourceEdge {
  node: Source!
  cursor: String!
}

enum SourceOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type SourcePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

type SourceSubscriptionPayload {
  mutation: MutationType!
  node: Source
  updatedFields: [String!]
  previousValues: SourcePreviousValues
}

input SourceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SourceWhereInput
  AND: [SourceSubscriptionWhereInput!]
  OR: [SourceSubscriptionWhereInput!]
  NOT: [SourceSubscriptionWhereInput!]
}

input SourceUpdateDataInput {
  name: String
}

input SourceUpdateInput {
  name: String
}

input SourceUpdateManyMutationInput {
  name: String
}

input SourceUpdateOneRequiredInput {
  create: SourceCreateInput
  update: SourceUpdateDataInput
  upsert: SourceUpsertNestedInput
  connect: SourceWhereUniqueInput
}

input SourceUpsertNestedInput {
  update: SourceUpdateDataInput!
  create: SourceCreateInput!
}

input SourceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [SourceWhereInput!]
  OR: [SourceWhereInput!]
  NOT: [SourceWhereInput!]
}

input SourceWhereUniqueInput {
  id: ID
  name: String
}

type Subscription {
  brick(where: BrickSubscriptionWhereInput): BrickSubscriptionPayload
  concept(where: ConceptSubscriptionWhereInput): ConceptSubscriptionPayload
  review(where: ReviewSubscriptionWhereInput): ReviewSubscriptionPayload
  source(where: SourceSubscriptionWhereInput): SourceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  email: String!
  password: String!
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  password: String
}

input UserUpdateInput {
  email: String
  password: String
}

input UserUpdateManyMutationInput {
  email: String
  password: String
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    