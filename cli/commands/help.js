const menus = {
  main: `
    bricabrac-cli [command] <options>

    database ........... database management
    version ............ show package version
    help ............... show help menu for a command`,

  database: `
    bricabrac-cli database <options>

    reset .............. reset the database to prod evironment`,
};

module.exports = args => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
