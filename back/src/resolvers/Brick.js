const author = (parent, args, context) =>
  context.prisma.brick({ id: parent.id }).author();
const source = (parent, args, context) =>
  context.prisma.brick({ id: parent.id }).source();
const parentConcept = (parent, args, context) =>
  context.prisma.brick({ id: parent.id }).parentConcept();
const childrenConcepts = (parent, args, context) =>
  context.prisma.brick({ id: parent.id }).childrenConcepts();

module.exports = { author, source, parentConcept, childrenConcepts };
