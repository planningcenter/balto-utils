# balto-utils
Utilities and sub-actions for our GitHub actions

## ncc

Automatically compiles and commits built files with ncc if build files were not
updated.

### Sample config

```yml
name: ncc
on:
  push:
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
