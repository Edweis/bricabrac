const minimist = require('minimist');
const commands = require('./commands');
// see https://timber.io/blog/creating-a-real-world-cli-app-with-node/

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  let cmd = args._[0];

  if (args.version || args.v) cmd = 'version';
  if (args.help || args.h) cmd = 'help';

  switch (cmd) {
    case 'database':
      commands.database(args);
      break;
    case 'version':
      commands.version(args);
      break;
    case 'help':
      commands.help(args);
      break;
    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
};
