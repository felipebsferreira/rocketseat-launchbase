const pathName = window.location.pathname
const links = document.querySelectorAll(".links a")

for (let link of links) {
    if (pathName.includes(link.getAttribute("href")))
        link.classList.add("active")
}

const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja deletar?")
    if (!confirmation) {
        event.preventDefault()
    }
})