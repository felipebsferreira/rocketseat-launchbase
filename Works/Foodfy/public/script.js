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

const ImageUpload = {
    input: "",
    preview: document.querySelector('.upload-gallery .images-preview'),
    imageInput: document.querySelector('.upload-gallery .image-input'),
    uploadLimit: 5,
    files: [],

    handleFileInput (event) {
        const { files: fileList } = event.target
        this.input = event.target

        if (!this.isLimitReached(event)) {
            Array.from(fileList).forEach(file => {
                this.files.push(file)

                const reader = new FileReader()

                reader.onload = () => {
                    const image = new Image()
                    image.src = String(reader.result)

                    const container = this.createPreviewContainer(image)
                    this.preview.appendChild(container)
                }

                reader.readAsDataURL(file)
            })

            this.displayContainer(this.preview)
        }

        if (this.files.length == this.uploadLimit) {
            this.undisplayContainer(this.imageInput)
        }

        this.input.files = this.getAllFiles()
    },

    getAllFiles () {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
    
        this.files.forEach(file => dataTransfer.items.add(file))
        return dataTransfer.files
    },

    createPreviewContainer (image) {
        const container = document.createElement('div')
        container.classList.add('image')

        container.onclick = this.removeImage

        container.appendChild(image)
        container.appendChild(this.createRemoveButton())

        return container
    },

    createRemoveButton () {
        const button = document.createElement('i')
        
        button.classList.add('material-icons')
        button.innerHTML = "delete"
        
        return button
    },

    removeImage (event) {
        const imageDiv = event.target.parentNode
        const imageDivArray = Array.from(ImageUpload.preview.children)
        
        const index = imageDivArray.indexOf(imageDiv)

        ImageUpload.files.splice(index, 1)
        ImageUpload.input.files = ImageUpload.getAllFiles()

        imageDiv.remove()

        if (ImageUpload.files.length < ImageUpload.uploadLimit)
            ImageUpload.displayContainer(ImageUpload.imageInput)
    },

    removeOldImage (event) {
        const imageDiv = event.target.parentNode

        if (imageDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                removedFiles.value += `${imageDiv.id},`
            }
        }
        
        imageDiv.remove()
    },

    displayContainer (container) {
        container.classList.remove("invisible")
    },

    undisplayContainer (container) {
        container.classList.add("invisible")
    },

    isLimitReached(event) {
        const { files: fileList } = event.target
        let limitReached = false

        if (fileList.length > this.uploadLimit) {
            alert(`Insira até no máximo ${this.uploadLimit} imagens!`)
            limitReached = true
        }
        
        const imagesDiv = []
        this.preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "image") {
                imagesDiv.push(item)
            }
        })

        if (fileList.length + imagesDiv.length > this.uploadLimit) {
            alert("Você atingiu o limite de fotos!")
            limitReached = true
        }

        if (limitReached) {
            event.preventDefault()
            return true
        }
        else
            return false
    }
}

const Lightbox = {
    highlight: document.querySelector(".details-card img.highlighted-image"),

    selectImage(event) {
        this.unselectAllImages(event)
        event.target.classList.add("selected")

        const imageSrc = "/assets/" + event.target.src.split("/assets/")[1]
        this.highlight.src = imageSrc
    },

    unselectAllImages(event) {
        const previewDiv = event.target.parentNode

        Array.from(previewDiv.children).forEach(children => {
            children.classList.remove("selected")
        })
    }
}