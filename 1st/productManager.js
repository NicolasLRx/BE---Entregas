let products = [];

const addProduct = (title, description, price, thumbnail, code, stock) => {
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
};

const getProducts = () => {
  console.log(products);
  return products;
};

const getProductByID = (id) => {
  const product = products.find((product) => product.id === id);
  if (!product) {
    console.log(`No se encontro el producto con el ID  ${id}`);
    return;
  }

  console.log(product);
  return product;
};

/////////////////////Test///////////////////

//Carga de productos

addProduct("Perfectos", "Cerdos", 50, "http://www.google.com.ar", "PF", 10);

//Test undefined , falta precio
addProduct("Micromix", "Cerdos Harina", "http://www.google.com.ar", "MMM", 10);

//Continua carga
addProduct("Mic full", "Aves", 100, "http://www.google.com.ar", "MF", 10);
addProduct("Derby", "Equino", 25, "http://www.google.com.ar", "DB", 10);

//////////////////////////////////////////

//Muestra de resultados

console.log("----------Listado completo de Productos----------");
getProducts();

console.log("----------Busqueda por ID----------");

console.log("----------ID 1----------");
getProductByID(1);

console.log("----------ID 4----------");
getProductByID(4);
