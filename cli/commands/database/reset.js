const ora = require('ora')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (args) => {
  console.log('reset with', {args})
  const spinner = ora().start()
  await sleep(2000);
  spinner.stop()
  console.log('done.')
}
