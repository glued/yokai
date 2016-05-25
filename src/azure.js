'use strict'
const azure = require('azure-storage')
const ROOT = '$root'

function createContainer(blobService, container){
  return new Promise((resolve, reject) =>{
    const config = { publicAccessLevel: 'blob' }
    if(!container) resolve()
    blobService.createContainerIfNotExists(container, config, (err, result, response) => {
        if(err){
          console.log('unable to create container', err, result, response)
          return reject(err)
        }

        console.log('container resolved - ', container)
        resolve()
    })
  })
}

function uploadAzureFile(blobService, container, folder, file, group){
  return new Promise((resolve, reject) => {
    let subfolder = group ? `${container}/` : ''
    let regex = new RegExp(`.*(${folder}/${subfolder})`)
    let blobName = file.replace(regex, '')
    blobName = blobName.replace(/\s+/g, '-')
    blobService.createBlockBlobFromLocalFile(container, blobName, file,  err => {
      if(err) return reject(err)
      console.log('uploaded -', blobName)
      resolve()
    })
  })
}

function buildGroup(group, container, filePath){
  let bucket = group.get(container)
  if(bucket)
    bucket.push(filePath)
  else
    group.set(container, [filePath])
}

function createContainerAndUpload(blobService, container, files, account, folder, group){
  return createContainer(blobService, container)
    .then(() => {
      let uploads = files.map(file => uploadAzureFile(blobService, container, folder, file, group))
      return Promise.all(uploads).then(() => {
        console.log(`\nhttps://${account}.blob.core.windows.net/${container}/`)
      })
    })
}

module.exports = {
  upload:(files, config, folder) => {
    const blobService = azure.createBlobService(config.account, config.key)

    if(config.container)
      return createContainerAndUpload(blobService, config.container, files, config.account, folder)

    let containers = new Map()
    const regex = new RegExp(`.*(${folder}/)`)

    for(let file of files){
      let pathName = file.replace(regex, '')
      let folders = pathName.split('/')
      buildGroup(containers, folders.length > 1 ? folders[0] : ROOT, file)
    }

    let groups = []
    containers.forEach((value, key) => groups.push(createContainerAndUpload(blobService, key, value, config.account, folder, key !== ROOT)))
    return Promise.all(groups)

  },

  remove:(container, config) => {
    const blobService = azure.createBlobService(config.account, config.key)
    return new Promise((resolve, reject) => {
      if(!container && config.container)
        container = config.container
      else if(!container)
        reject('no container')

      blobService.deleteContainer(container, err => {
        if(err) return reject(err)
        resolve()
      })
    })
  }
}
