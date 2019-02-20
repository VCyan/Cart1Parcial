class UserModel {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.photo = data.photo;
    this.userType = data.userType;
    this.state = data.state;
  }

  /*
  connector: mongo db connection
  userModel: data to insert
  callback: function to call
  */
  static insertUser(connector, userModel, callback){

      var data = {
          username: userModel.username,
          password: userModel.password,
          email: userModel.email,
          photo: userModel.photo,
          userType: userModel.userType,
          state: userModel.state
      };
      connector.insertDocInCollection('users', data, callback);
  }

  /*
  connector: mongo db connection
  userModel: data for where clause
  callback: function to call EACH time a record is found
  */
  static getUsers(connector, userModel, callback){

      connector.getDocsFromCollection('users', {}, callback);
  }
}

module.exports = UserModel;
