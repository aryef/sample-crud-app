# Create Typescript Project from Scratch

## Init

nvm install 17.0.2
nvm use 14.18.1
npm install -g yarn

curl https://get.volta.sh | bash
volta install node@14.18.1

npm install --global typescript


npx gitignore node
yarn init --yes
yarn add -D typescript eslint jest rimraf npm-run-all


yarn config set ignore-engines true

## config package.json

    * "scripts"
    * "types"

## Volta Pin

volta pin node yarn   // pin last stable versions of node and yarn

## Git

git init
git add -A
git commit -m "initial commit"

## typescript initialization

yarn tsc --init
yarn ./node_modules/.bin/tsc --init

// config tsconfig.json

## Eslint initialization

yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

yarn add -D eslint-config-prettier prettier eslint-plugin-promise eslint-plugin-sonarjs eslint-plugin-node

 yarn add -D typescript

 yarn add -D eslint-plugin-prettier

yarn eslint --init

    -- check syntax and find problems
    -- type of modules: None
    -- which framework: none (react?)
    -- does your project use Typescript: Yes
    -- where code runs: Node/Browser
    -- format config: json
    -- install dependencies with npm: Yes

delete package-lock.json

yarn  --network-timeout 1000000

configure .eslintrc.json

create tsconfig.eslint.json

yarn lint

## npm-run-all

yarn add -D npm-run-all

npx npm-run-all clean build-ts-dist

npx npm-run-all clean dev-watch

npx npm-run-all clean build-prod

## Configure Jest

yarn add -D jest @types/jest @babel/core @babel/preset-env @babel/preset-typescript

mkdir tests

add file index.test.ts

configure .babelrc, tests/tsconfig.json

yarn lint

yarn build

yarn test

npx npm-run-all clean build-ts-dist

## Add git remote

git remote add gitlab12_web_ts_boilerplate <http://10.100.102.104:10080/web/typescript-project-boilerplate.git>
git push -u gitlab12_web_ts_boilerplate --all
git push -u gitlab12_web_ts_boilerplate --tags

## Add Api-Extractor

yarn add -D @microsoft/api-extractor @microsoft/api-documenter

yarn api-extractor init

modify api-extractor.json

mkdir etc
(where api report will be placed)

yarn api-extractor run --local

(add temp to .gitignore )

--- after updating ts source code
--should run:
     yarn build
     yarn api-extractor run --local

-- yarn api-extractor run   ==> helps to detect public api changes (will fail if API changed)

## Api Documenter

yarn api-documenter markdown -i temp -o docs

## Publish gh-pages on Github

git remote add github_aryef_ts_boilerplate http://github.com/aryef/typescript-project-boilerplate.git
git push github_aryef_ts_boilerplate


## Refactor JS to TS

follow manual...

```sh
# rename all JSX files in src/ to TSX
find src -name '*.jsx' -exec bash -c 'git mv "$0" "${0%.jsx}.tsx"' "{}" \;
# rename all JS files in src/ to TS
find src -name '*.js' -exec bash -c 'git mv "$0" "${0%.js}.ts"' "{}" \;
# rename all JSX files in src/ to TSX
find tests -name '*.jsx' -exec bash -c 'git mv "$0" "${0%.jsx}.tsx"' "{}" \;
# rename all JSX files in src/ to TSX
find tests -name '*.jsx.snap' -exec bash -c 'git mv "$0" "${0%.jsx.snap}.tsx.snap"' "{}" \;
# rename all JS files in tests/ to TS
find tests -name '*.js' -exec bash -c 'git mv "$0" "${0%.js}.ts"' "{}" \;
```

rm -r .\dist


## Linting after refactoring

yarn lint



## Improve typing

tsconfig.json :
 "baseUrl": ".",
    "paths":{
        "*":["types/*"]
    },
    "traceResolution": true

yarn build-ts > .\debug\tsc-out.txt


## Type testing

### dtslint

https://github.com/microsoft/dtslint

./node_modules/.bin/tsc -P tsconfig.types.json

yarn add -D dtslint

mkdir ./tests/types-dtslint

add and configure various configs in this directory

add index and test.ts files for assertions

npx dtslint ./tests/types-dtslint/

### tsd

https://github.com/samverschueren/tsd

npm install -D tsd
yarn add -D tsd
