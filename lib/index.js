'use strict'
const program       = require('commander')
const path          = require('path')
const initAction    = require('./init')
const action        = require('./action')
const projectPath   = path.resolve(process.cwd(), '')
const CONFIG_NAME   = '.yokairc'

program
  .command('init')
  .usage(`create a blank ${CONFIG_NAME} config file`)
  .action(() => initAction(projectPath, CONFIG_NAME))

program
  .command('deploy-azure [folder]')
  .usage('deploy a folder to azure')
  .action(folder => action.deployAzure(projectPath, CONFIG_NAME, folder))

program
  .command('teardown-azure [container]')
  .usage('remove an azure container by name')
  .action(container => action.removeAzureContainer(projectPath, CONFIG_NAME, container))

program.parse(process.argv)

if(program.args.length < 1)
  program.help()
