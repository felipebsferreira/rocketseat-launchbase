const cards = document.querySelectorAll(".card")

for (let card of cards) {
    card.addEventListener("click", () => {
        const pageName = card.getAttribute("id")
        
        window.location.href = `/courses/${pageName}`
    });
}