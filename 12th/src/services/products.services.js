import productsRepository from "../persistences/mongo/repositories/products.repository.js";


const getAll = async (query, option) => {
  const products = productsRepository.getAll(query, option);
  return products;
};

const getByID = async (id) => {
  const product = await productsRepository.getByID(id);
  return product;
};

const create = async (data) => {
  const product = await productsRepository.create(data);
  return product;
};

const update = async (id, data) => {
  const product = await productsRepository.update(id, data);
  return product;
};

const del = async (id) => {
  const product = await productsRepository.del(id);
  return product;
};

export default {
  getAll,
  getByID,
  create,
  update,
  del,
};
