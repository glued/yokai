# Azure Blob Setup

#### I. Create a new storage account from https://ms.portal.azure.com

  ![storage](images/azure-storage.png)

#### II. Setup as blob storage

  ![storage](images/blob.png)

#### III. Grab your keys and account name for the `.yokairc` config file
Leave the container blank if you would like to use the root container
  ![keys](images/keys.png)

#### IV. Clean / Pretty URLs
Note that Azure blob storage [does not have a default document](https://feedback.azure.com/forums/217298-storage/suggestions/1180039-support-a-default-blob-for-blob-storage-containers#comments) like `index.html` so you'll need to configure a CDN to make that work.

- Create a new CDN

![cdn](images/cdn.png)

- Select **P1 Premium Verizon** with **Rules Engine**

![cdn kind](images/cdn_kind.png)

- Link your storage account to the cdn

![cdn link](images/cdn_storage.png)

- Click the **manage** button to launch the verizon tool to edit rewrite rules

![rewrite](images/rewrite_rules.png)

  - add a new rule **IF Always**
     - **Feature**
      - **URL Rewrite** - source `((?:[^\?]*/)?)($|\?.*)` destination `$1index.html$2`
      - **URL Rewrite** - source `((?:[^\?]*/)?[^\?/.]+)($|\?.*)` destination `$1.html$2`

The CDN takes time to populate, may take up to 4 hours.

#### V. COMPRESSION
Enable compression from the edgecast console:

![compress](images/compress.png)

#### VI. CNAME
