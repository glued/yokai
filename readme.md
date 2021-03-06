# Yokai
Static website deployments for Azure blob and CDN

Support for S3 and Google cloud coming soon

[![npm version](https://badge.fury.io/js/yokai.svg)](https://badge.fury.io/js/yokai)

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
  },
  "google": {

  }
}

```

After a `.yokairc` is created, you can deploy given that Azure is setup correctly via `yokai deploy-azure [folder]`
so, if your compiled build folder is `www` it would be `yokai deploy-azure www`

If no azure container is specified one will be created in the root via `$root`

You can remove a container with `yokai teardown-azure [container]`

Here is a [guide to configure Azure blob storage and CDN](azure.md)
