var util = require('util');
const { getConnection } = require('./database/db');



exports.listarCategorias = async (event, context, callback) => {

    let con = await getConnection();
    let query = util.promisify(con.query).bind(con);

    let items;

    try{
        items = await query(`SELECT * FROM mst_categories WHERE ISNULL(eliminado) = 1`);
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
