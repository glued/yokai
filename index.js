'use strict'
const program       = require('commander')
const path          = require('path')
const initAction    = require('./src/init')
const deployAction  = require('./src/deploy')
const projectPath   = path.resolve(process.cwd(), '')
const CONFIG_NAME   = '.yokairc'

program
  .command('init')
  .usage(`create a blank ${CONFIG_NAME} config file`)
  .action(() => initAction(projectPath, CONFIG_NAME))

program
  .command('deploy-azure [folder]')
  .usage('deploy a folder to azure')
  .action(folder => deployAction(projectPath, folder, CONFIG_NAME))

program
  .command('teardown-azure [container]')
  .usage('remove an azure blob by name')
  .action(container => {
    //todo
  })

program.parse(process.argv)

if(program.args.length < 1)
  program.help()
