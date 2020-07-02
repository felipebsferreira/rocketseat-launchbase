const Product = require("../models/Product")
const File = require("../models/File")

const { formatPrice, date } = require("../../lib/utils")

module.exports = {
    async index(request, response) {
        try {
            let results,
                params = {}

            const { filter, category } = request.query

            if (!filter)
                return response.redirect("/")

            params.filter = filter

            if (category) {
                params.category = category
            }

            async function getImage(productId) {
                let results = await File.getFilesByProductId(productId)
                const files = results.rows.map(file => `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`)
    
                return files[0]
            }

            results = await Product.search(params)

            const productPromises = results.rows.map(async product => {
                product.img = await getImage(product.id)
                product.price = formatPrice(product.price)
                product.oldPrice = formatPrice(product.old_price)
                return product
            })

            const products = await Promise.all(productPromises)

            const search = {
                term: request.query.filter,
                total: products.length
            }

            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {
                const found = categoriesFiltered.some(c => c.id == category.id)

                if (!found)
                    categoriesFiltered.push(category)

                return categoriesFiltered
            }, [])

            return response.render("search/index", { products, search, categories })
        } 
        catch (error) {
            console.error(error)
        }
    }
}