class SesionModel{

  constructor(data){
      this.id = data._id;
      this.username = data.username;
      this.token = data.token;
  }

  /*
  connector: mongo db connection
  sesionModel: data to insert
  callback: function to call
  */
  static insertSesion(connector, sesionModel, callback){

      var data = {
          username:sesionModel.username,
          token:sesionModel.token
      };
      connector.insertDocInCollection('sesions', data, callback);
  }

  /*
  connector: mongo db connection
  sesionModel: data to insert
  callback: function to call
  */
  static deleteSesion(connector, sesionModel, callback){

      var data = {
          username:sesionModel.username,
          token:sesionModel.token
      };
      connector.removeDocInCollection('sesions', data, callback);
  }
}

module.exports = SesionModel;
