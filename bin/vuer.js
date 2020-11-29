#!/usr/bin/env node
//指定解释器为node
const program = require('commander')

program.version(require('../package.json').version)
program
  .command('init <name>')
  .description('init project') //描述
  .action(require('../lib/initialization'))
program
  .command('refresh')
  .description('refresh routers...')
  .action(require('../lib/refresh'))
program
  .command('serve')
  .description('serve')
  .action(require('../lib/serve'))
program.parse(process.argv)