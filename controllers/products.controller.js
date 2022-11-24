const { HTTP_STATUS } = require("../constants/api.constants");
const { ProductsDao } = require("../models/daos/app.daos")
const { successResponse } = require("../utils/api.utils");

const productsDao = new ProductsDao();

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const users = await productsDao.getAll();
      const response = successResponse(users);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await productsDao.getById(id);
      const response = successResponse(user);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async saveProduct(req, res, next) {
    const { id, title, price, thumbnail } = req.body;
    try {
      const newUser = await productsDao.save({
        id, title, price, thumbnail
      });
      const response = successResponse(newUser);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params;
    try {
      const updateUser = await productsDao.update(id, req.body);
      const response = successResponse(updateUser);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const deletedUser = await productsDao.delete(id);
      const response = successResponse(deletedUser);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController();