const reset = require('./reset');

module.exports = args => {
  const cmd = args._[1];

  switch (cmd) {
    case 'reset':
      return reset(args);
      break;
    default:
      console.error(`database has no ${target} command`);
  }
};
