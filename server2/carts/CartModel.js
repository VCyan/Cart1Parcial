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
  static insertProduct(connector, username, prod, callback){

      /*var data = {
          id: cartModel.id,
          quantity: cartModel.quantity
      };*/
      console.log(prod);
      connector.updateDocInCollection('carts', { $push: { products: prod} }, username, callback);

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

  /*
  connector: mongo db connection
  cartModel: data for where clause
  callback: function to call EACH time a record is found
  */
  static emptyCart(connector, username, callback){

      connector.updateDocInCollection('carts', { $set: { products: []} }, username, callback);
  }
}

module.exports = CartModel;
