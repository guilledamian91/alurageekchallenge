import { servisProducts } from "./conexionAPI.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(nombre, precio, imagen, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${imagen}" alt="${nombre}">
        </div>
        <div class="card-container--info">
            <p>${nombre}</p>
            <div class="card-container--value">
                <p>$${precio}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="./img/bote-de-basura.png" alt="eliminar">
                </button>
            </div>
        </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener('click', async () => {
        try {
            await servisProducts.eliminarProduct(id);
            card.remove();
        } catch (err) {
            console.log(err);
        }
    });

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listproduct = await servisProducts.productList();

        listproduct.forEach(product => {
            productContainer.appendChild(
                createCard(product.nombre, product.precio, product.imagen, product.id)
            );
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-price]").value;
    const imagen = document.querySelector("[data-image]").value;

    servisProducts.createProduct(nombre, precio, imagen)
        .then((res) => {
            console.log(res);
            form.reset(); 
            render(); 
        })
        .catch((err) => console.log(err));
});

render();
