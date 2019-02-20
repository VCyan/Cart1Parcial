class ProductModel {
	constructor(data) {
		this.id = data._id;
		this.productName = data.productName;
		this.productPrice = data.productPrice;
		this.quantityProduct = data.quantityProduct;
		this.productDescription = data.productDescription;
		this.photoProduct = data.photoProduct;
	}
}

module.exports = ProductModel;