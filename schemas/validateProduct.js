const Joi = require('joi')
module.exports.productSchema = productSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required().min(0),
      category: Joi.string().required(),
})