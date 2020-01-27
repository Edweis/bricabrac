function bricks(parent, args, context, info) {
  return context.prisma.bricks();
}

module.exports = { bricks };
