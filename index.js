console.log("Preentrega Node.js");

console.log(process.argv);

const [, , method, resource, ...params] = process.argv;

const API_URL = "https://dummyjson.com/products";

const request = async (url, options) => {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

const [resourceName, productsID] = resource.split("/");

const [title, price, category] = params;


async function getProducts() {
    try {
        const data = await request(API_URL);
        console.log(data);

    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
}


async function getProduct(productsID) {
    try {
        const data = await request(`${API_URL}/${productsID}`);
        console.log(data);

    } catch (error) {
        console.error("Error fetching product:", error.message);
    }
}


async function createProduct(title, price, category) {
    try {
        const newProduct = {
            title,
            price: Number(price),
            category
        };

        const data = await request(`${API_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        console.log(data);

    } catch (error) {
        console.error("Error creating product:", error.message);
    }
}


async function deleteProduct(productsID) {
    try {
        const data = await request(`${API_URL}/${productsID}`, {
            method: "DELETE"
        });

        console.log(data);

    } catch (error) {
        console.error("Error deleting product:", error.message);
    }
}


if (method === "GET" && resourceName === "products") {

    if (productsID) {
        getProduct(productsID);
    } else {
        getProducts();
    }

} else if (method === "POST" && resourceName === "products") {

    createProduct(title, price, category);

} else if (method === "DELETE" && resourceName === "products") {

    if (productsID) {
        deleteProduct(productsID);
    } else {
        console.error("Debes indicar el ID del producto.");
    }

} else {

    console.error("Comando no válido.");
}