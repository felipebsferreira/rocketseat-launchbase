const pathName = window.location.pathname

const menuItems = document.querySelectorAll("header div a")
for (let item of menuItems) {
    if (pathName.includes(item.getAttribute("href"))) {
        item.classList.add("menu-selected")
    }
}

const menuAdmin = document.querySelector(".menu-admin")
const menuUsers = document.querySelectorAll(".menu-user")

if (pathName.includes("admin")) {
    const header = document.querySelector("header")
    header.classList.add("admin")

    header.querySelector("img").src = "/assets/logo_white.png"

    for (let item of menuItems) {
        item.classList.add("admin")
    }

    menuAdmin.classList.remove("display-none")

    for (let item of menuUsers)
        item.classList.add("display-none")
}
else {
    for (let item of menuUsers)
        item.classList.remove("display-none")

    menuAdmin.classList.add("display-none")
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

const addIngredients = document.querySelector(".add-ingredient")
if (addIngredients) {
    addIngredients.addEventListener("click", () => {
        const ingredients = document.querySelector("#ingredients")
        const fieldContainer = document.querySelectorAll(".ingredient")
    
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    
        if (newField.children[0].value == "")
            return false
    
        newField.children[0].value = ""
        ingredients.appendChild(newField)
    })
}

const deleteIngredient = document.querySelector(".delete-ingredient")
if (deleteIngredient) {
    deleteIngredient.addEventListener("click", () => {
        const ingredients = document.querySelector("#ingredients")
        const fieldContainer = document.querySelectorAll(".ingredient")
    
        if (fieldContainer.length <= 1) {
            return false
        } else {
            ingredients.removeChild(fieldContainer[fieldContainer.length - 1])
        }
    })
}

const addPreparation = document.querySelector(".add-preparation")
if (addPreparation) {
    addPreparation.addEventListener("click", () => {
        const preparations = document.querySelector("#preparations")
        const fieldContainer = document.querySelectorAll(".preparation")
    
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    
        if (newField.children[0].value == "")
            return false;
    
        newField.children[0].value = ""
        preparations.appendChild(newField)
    })
}

const deletePreparation = document.querySelector(".delete-preparation")
if (deletePreparation) {
    deletePreparation.addEventListener("click", () => {
        const preparations = document.querySelector("#preparations")
        const fieldContainer = document.querySelectorAll(".preparation")
    
        if (fieldContainer.length <= 1) {
            return false
        } else {
            preparations.removeChild(fieldContainer[fieldContainer.length - 1])
        }
    })
}