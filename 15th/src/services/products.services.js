import { productResponseDto } from "../dto/product-response.dto.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js";
import error from "../errors/customErrors.js";

const getAll = async (query, option) => {
  const products = productsRepository.getAll(query, option);
  return products;
};

const getByID = async (id) => {
  const productData = await productsRepository.getByID(id);
  if(!productData) throw error.notFoundError(`Product id ${id} not found` );
  const product = productResponseDto(productData);
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
