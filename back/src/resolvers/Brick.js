const Brick = {
  author: (parent, args, context) =>
    context.prisma.brick({ id: parent.id }).author(),
  source: (parent, args, context) =>
    context.prisma.brick({ id: parent.id }).source(),
  parentConcept: (parent, args, context) =>
    context.prisma.brick({ id: parent.id }).parentConcept(),
  childrenConcepts: (parent, args, context) =>
    context.prisma.brick({ id: parent.id }).childrenConcepts(),
};

module.exports = { Brick };
