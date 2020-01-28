const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  APP_SECRET,
  getUserId,
  getSourceId,
  getConceptId,
} = require('../helpers');

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const { email } = args;
  const user = await context.prisma.createUser({ email, password });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) throw new Error('No such user found');

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

async function postBrick(parent, args, context) {
  const userId = getUserId(context);
  const { content, source, parentConcept } = args;
  const sourceId = await getSourceId(context, source);
  const parentConceptId = await getConceptId(context, parentConcept);

  return context.prisma.createBrick({
    content,
    source: { connect: { id: sourceId } },
    parentConcept: { connect: { id: parentConceptId } },
    author: { connect: { id: userId } },
  });
}

const Mutation = { signup, login, postBrick };
module.exports = { Mutation };
