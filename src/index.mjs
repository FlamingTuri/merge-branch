import { $ } from 'zx';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

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
    .example("# assuming the current branch is develop")
    .example("node $0 -b main")
    .example("node $0 -b main -c rebase")
    .alias('v', 'version')
    .version('1.0.0')
    .argv;

try {
    const currentBranch = await $`git branch --show-current`;
    const targetBranch = argv.b;
    const mergeStrategy = argv.c;

    await $`git checkout ${targetBranch}`;
    await $`git pull`;
    await $`git checkout ${currentBranch}`;
    await $`git ${mergeStrategy} ${targetBranch}`;
} catch (p) {
    console.error(`Exit code: ${p.exitCode}`)
    console.error(`Error: ${p.stderr}`)
}
