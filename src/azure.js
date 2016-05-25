'use strict'
const azure = require('azure-storage')

function createContainer(blobService, bucket){
  return new Promise((resolve, reject) =>{
    const config = { publicAccessLevel: 'blob' }
    blobService.createContainerIfNotExists(bucket, config, (err, result, response) => {
        if(err){
          console.log('unable to create container', err, result, response)
          return reject(err)
        }
        resolve()
    })
  })
}

function uploadAzureFile(blobService, bucket, folder, file){
  return new Promise((resolve, reject) => {
    let regex = new RegExp(`.*(${folder}/)`)
    let blobName = file.replace(regex, '')
    blobName = blobName.replace(/\s+/g, '-')
    blobService.createBlockBlobFromLocalFile(bucket, blobName, file,  err => {
      if(err) return reject(err)
      console.log('uploaded -', blobName)
      resolve()
    })
  })
}

module.exports = (files, config, folder) => {
  const blobService = azure.createBlobService(config.account, config.key)
  const bucket = config.bucket
  return createContainer(blobService, bucket)
    .then(() => {
      let uploads = files.map(file => uploadAzureFile(blobService, bucket, folder, file))
      return Promise.all(uploads).then(() => {
        console.log(`\nhttps://${config.account}.blob.core.windows.net/${bucket}/`)
      })
    })
}
