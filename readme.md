# Yokai
Static website deployments for Azure blob and CDN

Support for S3 and Google cloud coming soon

[![npm version](https://badge.fury.io/js/icedtea.svg)](https://badge.fury.io/js/icedtea)

`npm install yokai -g` install global to access from any project

`yokai init` Generates a config file `.yokairc` in your project root and fill in your credentials:

```json
{
  "azure": {
    "account": "",
    "key": "",
    "container": ""
  },
  "aws": {
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": "",
    "Bucket": ""
  }
}

```

After a `.yokairc` is created, you can deploy given that Azure is setup correctly via `yokai deploy-azure [folder]`

so, if your compiled build folder is `www` it would be `yokai deploy-azure www`

Here is a [guide to configure Azure blob storage and CDN](azure.md)
