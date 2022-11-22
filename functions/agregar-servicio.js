var util = require('util');
const { getConnection } = require('./database/db');


exports.agregarServicio = async (event, context, callback) => {

    let con = await getConnection();
    let query = util.promisify(con.query).bind(con);

    let validaData = validar_datos(event);
    const requestBody = validaData.data_validada;

    let items;

    try{
        items = await query(`INSERT INTO trs_services(name, url_image, description, price, id_user, id_category) VALUES ('${requestBody.name}', '${requestBody.url_image}', '${requestBody.description}', '${requestBody.price}', ${requestBody.id_user}, ${requestBody.id_category} )`);
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

    function validar_datos(event){
        let response_validacion = {codigo: 200, mensaje: 'Datos validos', data_validada: {}};
        let requestBody = JSON.parse(event.body);
        if(event.body != null){
          response_validacion.data_validada.name = requestBody.name.trim();
          response_validacion.data_validada.url_image = requestBody.url_image.trim();
          response_validacion.data_validada.description = requestBody.description.trim();
          response_validacion.data_validada.price = requestBody.price.trim();
          response_validacion.data_validada.id_user = requestBody.id_user;
          response_validacion.data_validada.id_category = requestBody.id_category;
          return response_validacion;
        } else {
            response_validacion.codigo = 400;
            response_validacion.mensaje = 'Debe enviar los datos del pago a registrar';
            return response_validacion;
        }
      };
}
