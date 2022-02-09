let router = require("express").Router();
let ProductApiController = require("../controller/ProductApiController");

/* get apis*/
router.get("/", ProductApiController.home);
router.get("/product-list", ProductApiController.getProductList);

/* post apis*/
router.post("/add-new-product", ProductApiController.addNewProduct);
router.post("/check-login", ProductApiController.checkLogin);
router.post("/add-new-user", ProductApiController.addNewUser);
/* delete apis*/
router.delete("/remove-product", ProductApiController.removeProduct);
/* put apis*/
/* patch apis*/

module.exports = router;
