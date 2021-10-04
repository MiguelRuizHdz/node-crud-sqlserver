import { getConnection, queries, sql} from '../database';

export const getProducts = async (req, res) => {

    try {
        // llamamos a la conección, nos retorna el pool (cliente para conectarnos y pedir consultas)
        const pool = await getConnection();
        // la peticion es hacer una consulta, consulta todos los productos
        const result = await pool.request().query(queries.getAllProducts);
        // console.log(result)
    
        res.json(result.recordset);

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

};

export const createNewProduct = async (req, res) => {

    const { name, description } = req.body;
    let { quantity } = req.body;
    
    if (name == null || description == null ) {
        return res.status(400).json({msg: 'Bad Rquest. Please Fill all fields'});
    }
    
    if (quantity == null) quantity = 0;
    
    try {
        const pool = await getConnection()
        await pool.request()
                    .input('name', sql.VarChar, name)
                    .input('description', sql.Text, description)
                    .input('quantity', sql.Int, quantity)
                    .query(queries.addNewProduct);

        res.json({name, description, quantity});
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

};

export const getProductById = async (req, res) => {

    const { id } = req.params;

    try {
        const pool = await getConnection()
        const result = await pool.request()
                                .input('id', id)
                                .query(queries.getProductById);

        console.log(result.recordset[0]);
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

};
export const updateProductByID = async (req, res) => {
    
    const { id } = req.params;
    const { name, description, quantity } = req.body;
    
    if (name == null || description == null || quantity == null ) {
        return res.status(400).json({msg: 'Bad Rquest. Please Fill all fields'});
    }

    try {
        const pool = await getConnection()
        await pool.request()
                    .input('id', id)
                    .input('name', sql.VarChar, name)
                    .input('description', sql.Text, description)
                    .input('quantity', sql.Int, quantity)
                    .query(queries.updateProductById);

        res.json({name, description, quantity});

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

};

export const deleteProductById = async (req, res) => {

    const { id } = req.params;

    try {
        const pool = await getConnection()
        const result = await pool.request()
                                .input('id', id)
                                .query(queries.deleteProduct);

        res.sendStatus(204)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    
};

export const getTotalProducts = async (req, res) => {

    try {
        const pool = await getConnection()
        const result = await pool.request()
                                .query(queries.getTotalProducts);
        console.log(result)
        res.json(result.recordset[0]['']);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    
};
