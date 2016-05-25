'use strict'
const recursive = require('recursive-readdir')
const azure = require('./azure')
const fs = require('fs')

const ignoredFiles = [
  'node_modules',
  '.DS_Store',
  '*.log'
]

function readConfig(rcPath){
  return new Promise((resolve, reject) => {
    if(!fs.existsSync(rcPath)){
      console.log('config does not exist')
      reject()
    }else{
      let config = fs.readFileSync(rcPath)
      resolve(JSON.parse(config))
    }
  })
}

function readDirectory(dir){
  return new Promise((resolve, reject) => {
    recursive(dir, ignoredFiles, (err, files) => {
      if(err) return reject(err)
      else resolve(files)
    })
  })
}

module.exports = {
  deployAzure:(projectPath, configFile, folder) => {
    console.log('\n')
    const configPath = projectPath + '/' + configFile
    const dirPath = projectPath + '/' + folder
    readConfig(configPath).then(config => {
      readDirectory(dirPath).then(files => {
        azure.upload(files, config.azure, folder)
          .then(()=> {})
          .catch(err => console.log(err))
      })
    })
  },

  removeAzureContainer:(projectPath, configFile, container) => {
    const configPath = projectPath + '/' + configFile
    readConfig(configPath).then(config => {
      azure.remove(container, config.azure)
        .then(() => console.log(`${container} container removed`))
        .catch(err => console.log(err))
    })
  }
}
