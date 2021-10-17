# merge-branch

Usually, feature and fix branches are called with hard to remember/type names, like feature/#XXXXXX or fix/#YYY (where X and Y are usually numbers). Before creating a pull request, it is a common practice to previously align the feature/fix branch with the latest content of the target one.

`merge-branch` aims to speed up such task, by switching to a target branch, pulling its latest changes and merging them back into the starting branch.

Assuming the current working directory is a git repository and the current branch is called `feature/#ABCXYZ`, the following steps will be performed with the default configuration:

```
git checkout develop
git pull
git checkout feature/#ABCXYZ
git merge --no-ff develop
```

## Installing

```bash
npm install -g merge-branch
```

To install the latest version with security updates applied target `@dev` tag:

```bash
npm install -g merge-branch@dev
```

## Usage

Obviously target branch and merge strategy can be customized. This is `merge-branch` usage:

```bash
Utility to pull from a target git branch and merge it into the current one.

Options:
  -b, --branch   Define the target git branch  [default: "develop"]
  -c, --command  The merge command to run on the current branch  [default: "merge --no-ff"]
  -h, --help     Show help
  -v, --version  Show version number
```

## License

[MIT](LICENSE)
