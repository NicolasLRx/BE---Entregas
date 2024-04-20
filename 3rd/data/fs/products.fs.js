import fs from "fs";

//variables
let products = [];
let pathFile = "./data/fs/files/products.json";

//metodos

const getProducts = async () => {
  const productsJson = await fs.promises.readFile(pathFile, "utf-8");
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

export { getProducts, getProductByID, updateProduct, deleteProduct };
