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

  /*
  connector: mongo db connection
  productModel: data for where clause
  callback: function to call EACH time a record is found
  */
  static getProducts(connector, productModel, callback){

      connector.getDocsFromCollection('products', {}, callback);
  }
}

module.exports = ProductModel;
