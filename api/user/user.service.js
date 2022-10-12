const connectDB = require('../../config/db')

module.exports={
    create : (data,callback)=>{
        connectDB.query(`INSERT INTO user(name , email , password) values('${data.name}','${data.email}','${data.password}')`,
        (error , results , fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null,results)    
        }
        );
    }
};

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


module.exports.getUserByUserId=(req, res) => {
    const id = req.user.id;
    console.log(id);
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: true,
        data: results
      });
    });
  }

