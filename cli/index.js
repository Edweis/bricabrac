const minimist = require('minimist')

// see https://timber.io/blog/creating-a-real-world-cli-app-with-node/

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const cmd = args._[0]

  if (args.version || args.v) cmd = 'version';
  if (args.help || args.h) cmd = 'help';

  switch (cmd) {
    case 'database':
      require('./commands/database')(args)
      break
    case 'version':
      require('./commands/version')(args)
      break

    case 'help':
      require('./commands/help')(args)
      break
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}
