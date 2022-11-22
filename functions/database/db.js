const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

var mysql = require('mysql');
const NOMBRE_LOG = 'DB_CONNECTION';

async function getConnection() {
    
    const credential = new DefaultAzureCredential();
  
    const keyVaultName = "AdoptmeDB";
    const url = "https://" + keyVaultName + ".vault.azure.net";
  
    const client = new SecretClient(url, credential);
  
    // Create a secret
    // The secret can be a string of any kind. For example,
    // a multiline text block such as an RSA private key with newline characters,
    // or a stringified JSON object, like `JSON.stringify({ mySecret: 'SECRET_VALUE'})`.
    const secretName = "adoptmeDB"
    
    let resSecret;

    try {
        console.log('Obteniendo secret');
        resSecret = await client.getSecret(secretName);
    } catch (error) {
        console.log(NOMBRE_LOG, 'Error connection', error);  
        return;
    }

    const dataConnection = JSON.parse(resSecret.value);

    const connection = mysql.createConnection({
        host: dataConnection.hostname,
        user: dataConnection.username,
        password: dataConnection.password,
        database: "adoptme-mysql"
    });

    connection.connect();
    return connection;
};

module.exports = {getConnection};