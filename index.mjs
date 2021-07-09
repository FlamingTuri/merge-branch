import {$} from 'zx'

try {
    const currentBranch = await $`git branch --show-current`;
    const targetBranch = 'develop';

    await $`git checkout ${targetBranch}`;
    await $`git pull`;
    await $`git checkout ${currentBranch}`;
    await $`git merge --no-ff ${targetBranch}`;
} catch (p) {
    console.error(`Exit code: ${p.exitCode}`)
    console.error(`Error: ${p.stderr}`)
}
