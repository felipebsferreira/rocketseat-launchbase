const Category = require("../models/Category")
const Product = require("../models/Product")

const { formatPrice } = require("../../lib/utils")

module.exports = {
    async create (request, response) {
        const results = await Category.getAll()
        return response.render("products/create", { categories: results.rows })
    },

    async post (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }
        
        let results = await Product.create(request.body)    
        const productId = results.rows[0].id

        return response.redirect(`/products/${productId}`)
    },

    async edit (request, response) {
        let results = await Product.getById(request.params.id)
        const product = results.rows[0]

        if (!product)
            return response.send("Product not found!")

        product.price = formatPrice(product.price)
        product.old_price = formatPrice(product.old_price)

        results = await Category.getAll()
        const categories = results.rows

        return response.render("products/edit", { product, categories })
    },

    async put (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }

        request.body.price = request.body.price.replace(/\D/g, "")

        if (request.body.old_price != request.body.price) {
            const oldProduct = await Product.getById(request.body.id)
            request.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(request.body)

        return response.redirect(`/products/${request.body.id}/edit`)
    },

    async delete (request, response) {
        await Product.delete(request.body.id)

        return response.redirect("/products/create")
    }
}