# balto-utils
Utilities, composite actions, and reusable workflows for our GitHub actions

- [ncc](#ncc)
- [yarn](#yarn)
- [npm](#npm)
- [release-tagger](#release-tagger)

## ncc

Automatically compiles and commits built files with ncc if build files were not
updated.

### Simple config (requires using npm)

```yml
name: ncc
on:
  push:
    # Can't push a build commit to a tag, so only run for branches
    branches:
      - '**'
    paths:
      # Include any files that could require rebuilding
      - 'package-lock.json'
      - 'src/**'

jobs:
  ncc-build:
    uses: planningcenter/balto-utils/.github/workflows/ncc.yml@v2
```
<details>
<summary>
<h3>Advanced config</h3>
</summary>

```yml
name: ncc
on:
  push:
    # Can't push a build commit to a tag, so only run for branches
    branches:
      - '**'
    paths:
      # Include any files that could require rebuilding
      - 'package-lock.json'
      - 'src/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - uses: planningcenter/balto-utils/ncc@v2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
</details>

## yarn

Sets up a node environment with dependencies installed using yarn. Dependency libraries
are cached.

### Sample config

```yml
name: 'Run Tests'
on: [push]

jobs:
  run-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: planningcenter/balto-utils/yarn@v2
      - run: yarn test
```

## npm

Sets up a node environment with dependencies installed using npm. Dependency libraries
are cached.

### Sample config

```yml
name: 'Run Tests'
on: [push]
jobs:
  run-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: planningcenter/balto-utils/npm@v2
      - run: npm run-script test
```

## release-tagger

Composes other actions to move major (v1) and minor (v1.2) semver version tags
when a fully qualified (v1.2.3) tag is created.

### Sample Config

```yml
name: Release Tagger

on:
  push:
    tags:
      - "v[0-9]+.[0-9]+.[0-9]+"

jobs:
  release-tagger:
    uses: planningcenter/balto-utils/.github/workflows/release-tagger.yml@v2
```
