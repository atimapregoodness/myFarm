// const express = require('express')
// const router = express.Router()

// router.get('', async (req, res) => {
//     const farms = await Farm.find({})
//     res.render('farms/index', {farms})
// })

// router.get('/add', (req, res) => {
//     res.render('farms/add')
// })


// router.get('/:id', async (req, res) => {
//     const farm = await Farm.findById(req.params.id).populate('products')
//     const products = farm.products
//     res.render('farms/farmInfo', {farm, products})
// })

// router.get('/:id/edit', async (req, res) => {
//     const farm = await Farm.findById(req.params.id)
//     res.render('farms/edit', {farm})
// })


// router.get('/:id/products/add', async(req, res) => {
//     const {id} = req.params
//     const farm = await Farm.findById(id)
//     res.render('products/add', {categories, farm})
// })



// router.post('', async (req, res) =>{
//     const farm= new Farm(req.body)
//     await farm.save()
//     res.redirect('farms')
// })

// router.post('/:id/products', async (req, res) => {
//     const { id } = req.params;
//     const { name, price, category } = req.body;
    
//     const farm = await Farm.findById(id).populate('products')

//     const product = new Product({ name: name, price: price, category: category })
//     product.farm = farm;
//     await product.save()

//     farm.products.push(product)
//     farm.save()

//     res.redirect(`/${id}`)
// })

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const farm = await Farm.findByIdAndDelete(id).populate('products')

//     if (farm.products.length) {
//           await Product.deleteMany({ _id: { $in: farm.products } })
//           console.log(farm)
//     }

//     res.redirect('')

// })

// router.put('/:id', wrapAsync (async (req, res, next) => {
//     const { id } = req.params;
//     const farm = await Farm.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
//     res.redirect(`${farm._id}`)  
// }))

// module.exports = router;