import { createAzure } from "@ai-sdk/azure";

export const azure = createAzure({
  resourceName: "memo-east-us", // Azure resource name
  apiKey: process.env.AZURE_API_KEY,
});
