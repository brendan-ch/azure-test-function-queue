# Azure Queue Demo

This repository contains two Azure functions which interact with a queue.

# Running the project locally

This project requires Node.js 18.

1. Set up an [Azure storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal) or local emulator. I recommend using [Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio) to get up and running quickly.
2. Clone the repository. 
3. Install packages with `npm install`.
4. Create a `.env` file by duplicating `.env.example` and renaming it.
5. Set the `CONNECTION_STRING` environment variable. If you're using Azurite, the default config is as follows:

```bash
CONNECTION_STRING="DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;"
```

6. Start the project with `npm start`.
