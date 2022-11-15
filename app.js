const express = require('express')
const productsRouter = require('./routes/products')

const app = express()
app.use(express.json())

app.use(express.static('public'))



const server = app.listen(8080, ()=> console.log('Server up'))

app.use('/api/productos', productsRouter)





