const express = require('express')
const app = express()
const path = require('path')
const Product = require('./models/product')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const appError = require('./utils/appError')
const wrapAsync = require('./utils/wrapAsync')
const { productSchema } = require('./schemas/validateProduct')
const Farm = require('./models/farm')

const farmRoute = require('./routes/farmRoute')

const categories = [
      'fruits',
      'vegetables',
      'meat',
      'bread',
      'books'
];

mongoose.connect('mongodb://127.0.0.1:27017/farmProducts', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
      console.log("CONNECTION SUCCEEDED")
}).catch(err => {
      console.log(`CONNECTION FAILED`)
      console.log(err)
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate)

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
      res.redirect('/home')
})


//farm routs ++++++++++++++++++++

app.use('/farms', farmRoute)



//product routs

const productValidator = (req, res, next) => {
      const {error} = productSchema.validate(req.body)
      if (error) {
            const msg = error.details.map(el => el.message).join(',')
            throw new appError(msg, 400)

      } else{
            next()
      }
}

app.get('/products', wrapAsync(async (req, res, next) => {
      const { category } = req.query;
      
      if (category) {
            const products = await Product.find({category})
            res.render('products/index', { products, categories, category})
            
      } else {
            const products = await Product.find({})
            res.render('products/index', {products, categories, category: 'All Products'})
      } 
}))

app.get('/products/add', (req, res) => {
      res.render('products/add', {categories})
})

app.get('/products/:id', wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const foundProduct = await Product.findById(id).populate('farm')
      if (!foundProduct) throw new appError('Product Not Found', 404)
      
      const farmId = foundProduct.farm._id
      console.log(farmId)
      
      res.render('products/productInfo', { foundProduct, categories, farmId})
}))

app.get('/products/:id/info', wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const foundProduct = await Product.findById(id).populate('farm')
      if (!foundProduct) throw new appError('Product Not Found', 404)
      
      const farmId = foundProduct.farm._id
      
      res.render('products/info', { foundProduct, categories, farmId})
}))

app.post('/products', productValidator, wrapAsync(async (req, res, next) => {
      const foundProduct = new Product(req.body)
      await foundProduct.save()
      res.redirect(`products/${foundProduct._id}`)
}))


app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const product = await Product.findById(id)
      const farmId = product.farm._id

      res.render('products/edit', { product, categories, farmId }) 
}))

app.put('/products/:id', productValidator, wrapAsync (async (req, res, next) => {
      const { id } = req.params;
      const foundProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
      res.redirect(`${foundProduct._id}`)  
}))


app.delete('/products/:id', async (req, res) => {
      const { id } = req.params
      const deletedProduct = await Product.findByIdAndDelete(id)
      const farmId = deletedProduct.farm._id

      res.redirect(`/farms/${farmId}`)

})



app.use((err, req, res, next) => {
      if (err.name === "CastError") {
            next(new appError('Page not found', 404))
      }
      else if (err.status === 404) {
            next(new appError('Page not Found', 404))
      }
      else if (err.status === 400) {
            next(new appError(err.message, 400))
      }
      // else if (err.name === 'ValidationError') {
      //       next(err.message, 400)
      // }
})

app.all('*', (req, res, next) => {
      next(new appError('Page not found', 404))
})

app.use((err, req, res, next) => {
      const { status = 500 } = err;
      if(!err.message) message = 'Something Went wrong!!!'
      res.status(status).render('errorPage/error', {err})
})


app.listen(3000, (req, res) => {
      console.log('LISTENING TO PORT 3000')
})