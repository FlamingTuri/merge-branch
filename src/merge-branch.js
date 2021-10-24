const shelljs = require('shelljs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const mergeBranch = () => {
  const scriptName = 'merge-branch';

  const argv = yargs(hideBin(process.argv))
    .usage('Utility to pull from a target git branch and merge it into the current one.')
    .alias('b', 'branch')
    .describe('b', 'Define the target git branch')
    .default('b', 'develop')
    .alias('c', 'command')
    .describe('c', 'The merge command to run on the current branch')
    .default('c', 'merge --no-ff')
    .help('h')
    .alias('h', 'help')
    .example('# will merge develop branch into the current branch')
    .example(`${scriptName}`)
    .example('# will merge feature/xyz branch into the current branch')
    .example(`${scriptName} -b feature/xyz`)
    .example('# will merge feature/xyz branch into the current branch using rebase strategy')
    .example(`${scriptName} -b feature/xyz -c rebase`)
    .alias('v', 'version')
    .version('1.0.0')
    .wrap(yargs.terminalWidth())
    .argv;

  try {
    shelljs.config.verbose = true;
  
    const currentBranch = shelljs.exec('git branch --show-current');
    const targetBranch = argv.b;
    const mergeStrategy = argv.c;
  
    // necessary conversion: shell js stdout contains a new line
    if (currentBranch.stdout.replace('\n', '') === targetBranch) {
      console.warn('Nothing to do: current branch and target branch are the same!');
      process.exit(1);
    }
  
    shelljs.exec(`git checkout ${targetBranch}`);
    shelljs.exec('git pull');
    shelljs.exec(`git checkout ${currentBranch}`);
    shelljs.exec(`git ${mergeStrategy} ${targetBranch}`);
  } catch (e) {
    console.error(`Exit code: ${e.exitCode}`);
    console.error(`Error: ${e.stderr}`);
  }
}

module.exports = mergeBranch;
