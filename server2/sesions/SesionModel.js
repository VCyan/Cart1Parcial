class SesionModel{

  constructor(data){
      this.id = data._id;
      this.username = data.username;
      this.password = data.password;  
  }
}

module.exports = SesionModel;
