const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
    const credential = new DefaultAzureCredential();
  
    const keyVaultName = "AdoptmeDB";
    const url = "https://" + keyVaultName + ".vault.azure.net";
  
    const client = new SecretClient(url, credential);
  
    // Create a secret
    // The secret can be a string of any kind. For example,
    // a multiline text block such as an RSA private key with newline characters,
    // or a stringified JSON object, like `JSON.stringify({ mySecret: 'SECRET_VALUE'})`.
    const secretName = "adoptmeDB"
  
    // Read the secret we created
    const secret = await client.getSecret(secretName);
    console.log("secret: ", secret.value);

  }
  
  main();

  