/**
 * 
 * @param {array con products from DB} products 
 * @param {object response} res 
 */
const excelGenerator = (products, res) => {
    const xl = require('excel4node');
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet 1');

    //el mapeo convierte el id y retorna la lista de productos con el id "correcto"
    products = products.map((product) => {
        const _id = product._id.toString();
        delete product._id;
        return {
            _id,
            ...product
        }
    })

    var llaves = true;


    //ahora hay que recorrer los productos e insertarlos en celdas de excel

    //el primer for recorre todos los productos
    //el segundo "va" por las celdas insertando cada prop
    for (let i = 2; i <= products.length + 1; i++) {

        //imprimiendo keys en el excel
        if (llaves) {
            for (let k = 1; k < Object.keys(products[0]).length; k++) {
                ws.cell(1, k).string(`${Object.keys(products[0])[k - 1]}`)
            }
            llaves = false;
        }
        for (let j = 1; j < Object.keys(products[0]).length; j++) {
            let data = Object.values(products[i - 2])[j - 1]
            if (typeof data == 'string') {
                ws.cell(i, j).string(data);
            } else {
                ws.cell(i, j).number(data);
            }
        }

    }
    wb.write('Excel-en-node.xlsx', res);

}

module.exports = {
    excelGenerator,
}