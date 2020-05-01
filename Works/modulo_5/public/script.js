const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let oldPage, pages = []

    const qty = 2

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + qty
        const pagesBeforeSelectedPage = currentPage >= selectedPage - qty
        
        if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            if (oldPage && currentPage - oldPage > qty) {
                pages.push("...")
            }
            
            if (oldPage && qty > 1 && currentPage - oldPage == qty) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
    }

    return pages
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    const page = Number(pagination.dataset.page)
    const total = Number(pagination.dataset.total)
    const filter = pagination.dataset.filter
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}