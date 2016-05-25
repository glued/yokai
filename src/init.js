'use strict'
const fs = require('fs')

module.exports = (projectPath, configName) => {
  const config = JSON.stringify({
    azure:{
      account:'',
      key:'',
      bucket:''
    },
    aws:{
      accessKeyId:'',
      secretAccessKey:'',
      region:'',
      Bucket:''
    }
  }, null, 2)

  const rcPath = `${projectPath}/${configName}`

  if(fs.existsSync(rcPath))
    return console.log(`${configName} config already exists`)

  fs.writeFileSync(rcPath, config, 'utf8')
}
