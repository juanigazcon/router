const express = require('express')
const router = express.Router()

/* {id:1,
title: "Marquisse",
price: 15
thumbnail:"image"} */

let products = []

const newProductValidation = (req, res, next) => {
    let product = req.body
    if (!product.title || !product.price || !product.thumbnail) return res.status(400).send({err:'Mandatory data missing'})
    next()
}


const chosenProductValidation = (req, res, next) =>{
    let parametro = req.params.id
    //if(parametro > (products.length +1)) return res.status(400).send({err: "Out of bound"})
    if(isNaN(parametro)) return res.status(400).send({err: "Please provide a numeric id"})
    if(!(products.some((item)=>item.id == parametro))) return res.status(400).send({err: "Producto no encontrado"})
    next()
}

//devuelve todos los productos
router.get('/', (req,res) =>{
    res.send({products})
})

//devuelve el producto solicitado por id
router.get('/:id', chosenProductValidation,  (req,res)=>{
    let parametro = req.params.id
    let chosenProduct = (products.filter((item)=>item.id == parametro))
    res.send(chosenProduct)
})

//recibe y agrega un producto, y lo devuelve con su id asignado
router.post('/', newProductValidation, (req,res) =>{
    let product = req.body

    if(products.length>0){

    let id= products[products.length-1].id    
    product.id = id+1;

    } else {product.id = 1}

    products.push(product)

    res.send({message: "Product successfully created", product})
})

//recibe y actualiza un produto según su id
router.put('/:id', chosenProductValidation,  (req,res) =>{

    let parametro = req.params.id
    let newProduct =  req.body
    let productoModificado = products.find((item)=> item.id === parametro)
    productoModificado = newProduct

    res.send({message: "Product successfully modified", newProduct})
    
})

//elimina un producto según su id
router.delete('/:id', chosenProductValidation, (req,res)=> {

    let parametro = req.params.id
    products.splice(parametro-1,1)

    res.send({message: "Product successfully deleted", products})

})





module.exports = router


