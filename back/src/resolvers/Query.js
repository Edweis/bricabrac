const { getUserId } = require('../helpers');

const Query = {
  bricks: (parent, args, context) => context.prisma.bricks(),
  health: (parent, args, context) => {
    let userId;
    try {
      userId = getUserId(context);
    } catch (err) {
      userId = null;
    }
    return { status: 'up', isConnected: userId != null };
  },
};

module.exports = { Query };
