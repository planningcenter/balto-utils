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
      - uses: planningcenter/balto-utils/ncc@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
