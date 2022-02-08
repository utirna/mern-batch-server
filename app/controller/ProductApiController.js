const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ProductModel, UserModel } = require("../model/ProductModel");

var ProductApiController = {
  home: function (req, res) {
    res.status(200).send({ status: true });
  },
  addNewProduct: async function (req, res) {
    var data = req.body;
    let product = new ProductModel({
      product_name: data.product_name,
      product_price: data.product_price,
    });
    try {
      let result = await product.save();
      res
        .status(200)
        .send({ status: 1, message: "product saved successfully", result });
    } catch (error) {
      res.status(501).send({ status: 0, error });
    }
  },
  getProductList: async function (req, res) {
    try {
      let result = await ProductModel.find({}, { __v: 0 });
      res.status(200).send({ status: 1, list: result });
    } catch (error) {
      res.status(501).send({ status: 0, error });
    }
  },
  removeProduct: async function (req, res) {
    var id = req.body.id;
    try {
      let { deletedCount } = await ProductModel.deleteOne({ _id: id });
      res.status(200).send({ status: 1, result: deletedCount });
    } catch (error) {
      res.status(501).send({ status: 0, error });
    }
  },
  addNewUser: async function (req, res) {
    let userData = req.body;

    try {
      let userCount = await UserModel.findOne({
        username: userData.username,
      }).count();
      if (userCount > 0) {
        res.status(200).send({ status: 0, message: "user exists" });
      } else {
        let salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(userData.password, salt);
        let user = new UserModel({
          username: userData.username,
          password: newPassword,
          name_of_user: userData.name_of_user,
        });
        let result = await user.save();
        let token = jwt.sign(
          {
            username: userData.name_of_user,
            id: result._id,
          },
          process.env.PRIVATE_KEY
        );
        res.header("Access-Control-Expose-Headers", "x_auth_token");
        res.header("x_auth_token", token);
        res.status(200).send({ status: 1 });
      }
    } catch (error) {
      res.status(501).send({ status: 0, error });
    }
  },
  checkLogin: async function (req, res) {
    let data = req.body;
    try {
      let user = await UserModel.findOne({
        username: data.username,
      });
      if (user) {
        let result = await bcrypt.compare(data.password, user.password);
        if (result == true) {
          let token = jwt.sign(
            {
              username: user.username,
              id: user._id,
            },
            process.env.PRIVATE_KEY
          );
          res.header("x-auth-token", token);
          res.status(200).send({ status: 1 });
        } else {
          res.status(400).send({ status: 0, message: "invalid password" });
        }
      } else {
        res.status(400).send({ status: 0, message: "user not found" });
      }
    } catch (error) {
      res.send({ status: 0, error });
    }
  },
};

module.exports = ProductApiController;
