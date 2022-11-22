var util = require('util');
const { getConnection } = require('./database/db');


exports.eliminarServicio = async (event, context, callback) => {

    let con = await getConnection();
    let query = util.promisify(con.query).bind(con);

    let id_service = event.queryStringParameters.id_service;
    let items;

    try{
        items = await query(`UPDATE trs_services SET eliminado = 1 WHERE id_service = ${id_service})`);
        con.end();
    } catch(err){
        con.end();
        console.log(err);
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
