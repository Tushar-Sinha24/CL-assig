const connectDB = require('../../config/db')

module.exports={
    create : (data,callback)=>{
        connectDB.query(`INSERT INTO user(name , email , password)
        VALUES(?,?,?)`,
        [
            data.name,
            data.email,
            data.password
        ],
        (error , results , fields) =>{
            if(error){
                return callback(error);
            }
            return callback(null,results)    
        }
        );
    }
};