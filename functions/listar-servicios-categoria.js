var util = require('util');
const { getConnection } = require('./database/db');



exports.listarServiciosCategoria = async (event, context, callback) => {

    let con = await getConnection();
    let query = util.promisify(con.query).bind(con);

    let id_category = event.queryStringParameters.id_category;

    let items;

    try{
        items = await query(`SELECT * FROM trs_services WHERE id_category = ${id_category} and ISNULL(eliminado) = 1`);
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
