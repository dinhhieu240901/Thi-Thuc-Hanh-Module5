# Install dependencies
```$ npm install```
# Running server
```$ node app.js```
- The server listens at port 3001
# APIs
#### Product model
    {
        id: 1,
        name: 'Áo sơ mi dài tay nam',
        price: '795000',
        stock: 100,
        description: 'Áo sơ mi dài tay phom Regular fit suông nhẹ nhưng vẫn đảm bảo vừa vặn, chỉn chu khi mặc.'
    }

#### Getting all products
```GET http://localhost:3001/products```
#### Getting a product by id
```GET http://localhost:3001/products/1```
#### Creating a product
```POST http://localhost:3001/products```
#### Deleting a product by id
```DELETE http://localhost:3001/products/1```
#### Updating a product by id
```PUT http://localhost:3001/products/1```
