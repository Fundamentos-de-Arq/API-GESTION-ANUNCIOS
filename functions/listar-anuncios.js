const dynamodb = require('aws-sdk/clients/dynamodb');
const db = new dynamodb.DocumentClient();

const anunciosTable = process.env.ANUNCIOS_TABLE;

exports.listarAnuncios = async (event, context, callback) => {

    let params = {
        TableName : anunciosTable,
    };

    const data = await db.scan(params).promise();
    const items = [];
    if(data && data.Items) {        
        data.Items.forEach(element => {
            items.push(element);
        });
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"           
        }
    };

    return response;
}
