const fs = require("fs");
const { json } = require("node:stream/consumers");
const { getPriority } = require("os");

//variables
let products = [];
let pathFile = "./data/products.json";

const addProduct = async (
  title,
  description,
  price,
  thumbnail,
  code,
  stock
) => {
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };

  Object.values(newProduct);
  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }

  const productsExists = products.find((product) => product.code === code);
  if (productsExists) {
    console.log(`El producto ${title} con el codigo ${code} ya existe`);
    return;
  }

  products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const getProducts = async () => {
  const productsJson = await fs.promises.readFile(pathFile, "utf8");
  products = JSON.parse(productsJson) || [];

  return products;
};

const getProductByID = async (id) => {
  await getProducts();

  const product = products.find((product) => product.id === id);
  if (!product) {
    console.log(`No se encontro el producto con el ID  ${id}`);
    return;
  }

  console.log(product);
  return product;
};

const updateProduct = async (id, dataProduct) => {
  await getProducts();
  const index = products.findIndex((product) => product.id === id);

  products[index] = {
    ...products[index],
    ...dataProduct,
  };

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const deleteProduct = async (id) => {
  await getProducts();
  products = products.filter((product) => product.id !== id);
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

//Muestra de resultados

console.log("----------Listado completo de Productos----------");
/* getProducts(); */

/* getProductByID(22); */

/* updateProduct(3, {
  title: "Macro corrector",
  description: "rumiante",
}); */

deleteProduct(2);
