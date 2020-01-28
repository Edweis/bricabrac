const jwt = require('jsonwebtoken');

const APP_SECRET = 'GraphQL-is-aw3some';

const getUserId = context => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
};

const getSourceId = async (context, name) => {
  const source = await context.prisma.source({ name });
  if (source) return source.id;
  console.debug(`source ${name} will be added`);
  const newSource = await context.prisma.createSource({ name });
  return newSource.id;
};

const getConceptId = async (context, name) => {
  const concept = await context.prisma.concept({ name });
  if (concept) return concept.id;
  console.debug(`concept ${name} will be added`);
  const newConcept = await context.prisma.createConcept({ name });
  return newConcept.id;
};

module.exports = { APP_SECRET, getUserId, getSourceId, getConceptId };
