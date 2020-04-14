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

const images = document.querySelectorAll(".card img")

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", () => {
        window.location.href = `/recipes/${i}`
    })
}