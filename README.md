# TDD start repo

## Available Bases
* [master](https://github.com/petercipov/tdd-base/tree/master) - simple repo with minimal tools, handy for quick command-line prototyping
* [nest.js](https://github.com/petercipov/tdd-base/tree/nest.js) - fully fledged skeleton for nest.js
## Options
```
npm run
  start
    starts server on default port
  lint
    runs tslint on src folder
  lint:fix
    runs lint and fixes the issue
  compile
    compiles typescript project
  build
    runs whole suite with compile, lint  and test
  test
    runs whole test suite
  test:watch
    runs tests in TTD mode
```


## Quick Start TDD
```
  npm install
  npm run test:watch
```

## Quick Start Server
```
  npm install
  npm run build
  npm run start
```
API documentation at http://localhost:8080/swagger