class ProductModel {
	constructor(data) {
		this.id = data._id;
		this.productName = data.productName;
		this.productPrice = data.productPrice;
		this.quantityProduct = data.quantityProduct;
		this.productDescription = data.productDescription;
		this.photoProduct = data.photoProduct;
	}

  /*
  connector: mongo db connection
  productModel: data to insert
  callback: function to call
  */
  static insertProduct(connector, productModel, callback){

      var data = {
          productName: productModel.productName,
          productPrice: productModel.productPrice,
          quantityProduct: productModel.quantityProduct,
          productDescription: productModel.productDescription,
          photoProduct: productModel.photoProduct
      };
      connector.insertDocInCollection('products', data, callback);
  }
}

module.exports = ProductModel;
