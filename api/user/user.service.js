const connectDB = require('../../config/db')

module.exports.create=(data,callback)=>{
        connectDB.query(`INSERT INTO user(name , email , password) values('${data.name}','${data.email}','${data.password}')`,
        (error , results , fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null,results)    
        }
        );
    }


module.exports.getUserByUserEmail = (email, callback)=>{
    connectDB.query(`select * from user where email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
}


module.exports.getUserByUserId=(id, callback)=> {
  connectDB.query(`select * from user where id = ?`,
  [id],
  (error, results, fields) => {
    if (error) {
      return callback(error);
    }
    console.log(results)
    return callback(null, results[0]);
  }
);
  }

