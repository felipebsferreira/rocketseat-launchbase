const Product = require("../models/Product")
const File = require("../models/File")

const { formatPrice, date } = require("../../lib/utils")

module.exports = {
    async index(request, response) {
        let results = await Product.all()
        const products = results.rows

        if (!products)
            return response.send("Products not found!")

        async function getImage(productId) {
            let results = await File.getFilesByProductId(productId)
            const files = results.rows.map(file => `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const productPromises = products.map(async product => {
            product.img = await getImage(product.id)
            product.price = formatPrice(product.price)
            product.oldPrice = formatPrice(product.old_price)
            return product
        }).filter((product, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(productPromises)

        return response.render("home/index", { products: lastAdded })
    }
}