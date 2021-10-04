export const queries = {
    getAllProducts: 'SELECT * FROM Products',
    addNewProduct: 'INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)',
    getProductById: 'SELECT * FROM Products Where Id = @Id',
    deleteProduct: 'DELETE FROM Products Where Id = @Id',
    getTotalProducts: 'SELECT COUNT(*) FROM Products',
    updateProductById: 'UPDATE Products SET Name = @name, Description = @description, Quantity = @quantity where Id = @Id'
}