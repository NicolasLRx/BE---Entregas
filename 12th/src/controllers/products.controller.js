import productService from "../services/products.services.js";

const getAll = async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };

    if (status) {
      const products = await productService.getAll({ status: status }, options);
      return res.status(200).json({ products });
    }

    if (category) {
      const products = await productService.getAll(
        { category: category },
        options
      );
      return res.category(200).json({ products });
    }

    const products = await productService.getAll({}, options);

    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
};

const getByID = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getByID(pid);
    if (product) {
      return res.status(201).json({ status: "success", payload: product });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
};

const create = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productService.create(product);

    res.status(200).json({ status: "success", payload: newProduct });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
};

const update = async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;

    const updateProduct = await productService.update(pid, productData);
    if (updateProduct) {
      return res
        .status(201)
        .json({ status: "success", payload: updateProduct });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
};

const del = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productService.del(pid);
    if (!product) {
      return res
        .status(404)
        .json({
          status: "Error",
          msg: `Producto con el id ${pid} no encontrado`,
        });
    }
    res.status(200).json({ status: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
};

export default {
  getAll,
  getByID,
  create,
  update,
  del,
};
