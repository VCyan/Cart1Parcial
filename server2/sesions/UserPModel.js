class UserPModel{

  constructor(data) {
      this.id = data._id;
      this.username = data.username;
      this.password = data.password;
  }

  /*
  connector: mongo db connection
  userModel: data for where clause
  callback: function to call EACH time a record is found
  */
  static getUsers(connector, userModel, callback){

      connector.getDocsFromCollection('users', userModel, callback);
  }
}

module.exports = UserPModel;
