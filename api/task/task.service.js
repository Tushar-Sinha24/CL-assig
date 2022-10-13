const connectDB = require('../../config/db')

module.exports.taskCreate=(data,callback)=>{
    connectDB.query(`INSERT INTO task(title , dueDate , user , file) values('${data.title}','${data.dueDate}','${data.user}','${data.file}' )`,
    (error , results , fields) =>{
        if(error){
            return callback(error);
        }
        return callback(null,results)    
    }
    );
}

module.exports.taskUpdate=(data,taskId,callback)=>{
   if(data.title && data.dueDate ){
    connectDB.query(`update task set title ='${data.title}', dueDate='${data.dueDate}'  WHERE id=?`,
    [taskId],
    (error , results , fields) =>{
        if(error){
            return callback(error);
        }
        return callback(null,results)    
    }
    );
   }
   else if(data.title){
    connectDB.query(`update task set title ='${data.title}' WHERE id=?`,
    [taskId],
    (error , results , fields) =>{
        if(error){
            return callback(error);
        }
        return callback(null,results)    
    }
    );
   }
   else if(data.dueDate){
    connectDB.query(`update task set date ='${data.dueDate}' WHERE id=?`,
    [taskId],
    (error , results , fields) =>{
        if(error){
            return callback(error);
        }
        return callback(null,results)    
    }
    );
   }
}

module.exports.taskDelete=(taskId,callback)=>{
    
    connectDB.query(`delete from task WHERE id=?`,
    [taskId],
    (error , results , fields) =>{
        if(error){
            return callback(error);
        }
        return callback(null,results)    
    }
    );
}


module.exports.taskGet=(userID,callback)=>{
    
    connectDB.query(`select * from task where user = ?`,
    [userID],
    (error , results , fields) =>{
        if(error){
            return callback(error);
        }
        return callback(null,results)    
    }
    );
}