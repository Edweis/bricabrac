const Query = {
  bricks: (parent, args, context) => context.prisma.bricks(),
};

module.exports = { Query };
