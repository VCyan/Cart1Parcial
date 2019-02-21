class CartModel{
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.products = data.products;
  }

  /*
  connector: mongo db connection
  cartModel: data for where clause
  callback: function to call EACH time a record is found
  */
  static insertProduct(connector, username, cartModel, callback){

      var data = {
          id: cartModel.id,
          quantity: cartModel.quantity
      };
      //log(cartModel)
      connector.updateDocInCollection('carts', { $push: { products: data} }, username, callback);

  }

  /*
  connector: mongo db connection
  cartModel: data for where clause
  callback: function to call EACH time a record is found
  */
  static getCarts(connector, cartModel, callback){
      //console.log(cartModel);
      connector.getDocsFromCollection('carts', cartModel, callback);
  }
}

module.exports = CartModel;
