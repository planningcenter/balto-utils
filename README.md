# balto-utils
Utilities, composite actions, and reusable workflows for our GitHub actions

## ncc

Automatically compiles and commits built files with ncc if build files were not
updated.

### Sample config

```yml
name: ncc
on:
  push:
    tags-ignore:
      # Can't push a build commit to a tag, so ignore them all
      - '**'
    paths:
      # Include any files that could require rebuilding
      - 'package-lock.json'
      - 'src/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - uses: planningcenter/balto-utils/ncc@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## yarn

Sets up a node environment with dependencies installed using yarn. Dependency libraries
are cached.

### Sample config

```yml
name: 'Run Tests'
on: [push]

jobs:
  runTests:
    runs-on: ubuntu-latest
    steps:
      - uses: planningcenter/balto-utils/yarn@v1
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
  runTests:
    runs-on: ubuntu-latest
    steps:
      - uses: planningcenter/balto-utils/npm@v1
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
    uses: planningcenter/balto-utils/.github/workflows/release-tagger.yml@v1
```
