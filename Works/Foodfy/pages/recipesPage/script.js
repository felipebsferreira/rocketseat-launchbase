const modalOverlay = document.querySelector(".modal-overlay");
const body = document.querySelector("body");
const images = document.querySelectorAll(".card img");

for (let image of images) {
    image.addEventListener("click", () => {
        modalOverlay.classList.add("active");
        body.classList.add("no-scroll");

        const name = image.className;
        modalOverlay.querySelector("img").src = `../../assets/${name}.png`;

        if (name === "burger") {
            modalOverlay.querySelector(".modal-name").innerHTML = "Triplo bacon burguer";
            modalOverlay.querySelector(".modal-author").innerHTML = "por Jorge Relato";
        } else if (name === "pizza") {
            modalOverlay.querySelector(".modal-name").innerHTML = "Pizza 4 estações";
            modalOverlay.querySelector(".modal-author").innerHTML = "por Fabiana Melo";
        } else if (name === "espaguete") {
            modalOverlay.querySelector(".modal-name").innerHTML = "Espaguete ao alho";
            modalOverlay.querySelector(".modal-author").innerHTML = "por Júlia Kinoto";
        } else if (name === "lasanha") {
            modalOverlay.querySelector(".modal-name").innerHTML = "Lasanha mac n' cheese";
            modalOverlay.querySelector(".modal-author").innerHTML = "por Juliano Vieira";
        } else if (name === "doce") {
            modalOverlay.querySelector(".modal-name").innerHTML = "Docinhos pão-do-céu";
            modalOverlay.querySelector(".modal-author").innerHTML = "por Ricardo Golvea";
        } else if (name === "asinhas") {
            modalOverlay.querySelector(".modal-name").innerHTML = "Asinhas de frango ao barbecue";
            modalOverlay.querySelector(".modal-author").innerHTML = "por Vania Steroski";
        }
    });
}

modalOverlay.querySelector(".modal-close").addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    body.classList.remove("no-scroll");

    modalOverlay.querySelector("img").src = "";
    modalOverlay.querySelector(".modal-name").innerHTML = "";
    modalOverlay.querySelector(".modal-author").innerHTML = "";
});