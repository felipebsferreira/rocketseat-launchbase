const modalOverlay = document.querySelector(".modal-overlay");
const modal = modalOverlay.querySelector(".modal");
const cards = document.querySelectorAll(".card");

for (let card of cards) {
    card.addEventListener("click", () => {
        const pageName = card.getAttribute("id");

        console.log(pageName);

        modalOverlay.querySelector("iframe").src = `https://rocketseat.com.br/${pageName}`;
        modalOverlay.classList.add("active");
    });
}

modalOverlay.querySelector(".modal-maximize").addEventListener("click", () => {
    if (modal.classList.contains("maximized")) {
        modal.classList.remove("maximized");
    } else {
        modal.classList.add("maximized");
    }
});

modalOverlay.querySelector(".modal-close").addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    
    modal.classList.remove("maximized");
    modalOverlay.querySelector("iframe").src = "";
});