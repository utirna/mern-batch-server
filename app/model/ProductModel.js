let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ProductSchema = new Schema({
  product_name: String,
  product_price: Number,
});
let UserSchema = new Schema({
  name_of_user: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const ProductModel = mongoose.model("ProductList", ProductSchema);
const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  ProductModel,
  UserModel,
};
