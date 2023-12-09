
const mongoose = require('mongoose')
const Product = require('./product')
const { Schema } = mongoose;


const farmSchema = new Schema({
      name: {
            type: String,
            required: [true, 'farm must have a name']
      },
      location: {
            type: String,
            required: [true, 'location of your farm is required']
      },
      email: {
            type: String,
      },
      description: {
            type: String,
      },
      products: [
            {
                  type: Schema.Types.ObjectId,
                  ref: 'Product'
            }
      ]
})

farmSchema.post('findOneAndDelete', async function (farm){
      console.log('Deleting')
      if (farm.products.length) {
            Product.deleteMany({ _id: { $in: farm.products._id } })
            console.log(farm)
      }
})

const Farm = mongoose.model('Farm', farmSchema)
module.exports = Farm