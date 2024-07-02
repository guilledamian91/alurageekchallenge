const productList = () => {
    return fetch("http://localhost:3000/productos")
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const createProduct = (nombre, precio, imagen) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,
        })
    }).then((res) => res.json()).catch((err) => console.log(err));
};

const eliminarProduct = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
    }).catch((err) => console.log(err));
};

export const servisProducts = {
    productList,
    createProduct,
    eliminarProduct
};
