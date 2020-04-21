const pathName = window.location.pathname

const menuItems = document.querySelectorAll("header div a")
for (let item of menuItems) {
    if (pathName.includes(item.getAttribute("href"))) {
        item.classList.add("menu-selected")
    }
}

if (pathName.includes("admin")) {
    const header = document.querySelector("header")
    header.classList.add("admin")

    header.querySelector("img").src = "/assets/logo_white.png"

    for (let item of menuItems) {
        item.classList.add("admin")
    }
}

const pList = document.querySelectorAll(".details-info p")

function changePInnerHTML(p) {
    if (p.innerHTML == "ESCONDER") {
        p.innerHTML = "MOSTRAR"
    } else {
        p.innerHTML = "ESCONDER"
    }
}

for (let p of pList) {
    p.addEventListener("click", () => {
        changePInnerHTML(p)   
        
        const type = p.classList[0]
        const item = document.querySelector(`.details-${type}`)

        if (item.classList.contains("details-hidden")) {
            item.classList.remove("details-hidden")
        } else {
            item.classList.add("details-hidden")
        }
    })
}

document.querySelector(".add-ingredient").addEventListener("click", () => {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "")
        return false

    newField.children[0].value = ""
    ingredients.appendChild(newField)
})

document.querySelector(".delete-ingredient").addEventListener("click", () => {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")

    if (fieldContainer.length <= 1) {
        return false
    } else {
        ingredients.removeChild(fieldContainer[fieldContainer.length - 1])
    }
})

document.querySelector(".add-preparation").addEventListener("click", () => {
    const preparations = document.querySelector("#preparations")
    const fieldContainer = document.querySelectorAll(".preparation")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "")
        return false;

    newField.children[0].value = ""
    preparations.appendChild(newField)
})

document.querySelector(".delete-preparation").addEventListener("click", () => {
    const preparations = document.querySelector("#preparations")
    const fieldContainer = document.querySelectorAll(".preparation")

    if (fieldContainer.length <= 1) {
        return false
    } else {
        preparations.removeChild(fieldContainer[fieldContainer.length - 1])
    }
})