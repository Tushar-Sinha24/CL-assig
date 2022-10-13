const {taskCreate, taskUpdate , taskDelete , taskGet} = require('./task.service');


module.exports.createTask = (req,res)=>{
    const body =({
        title:req.body.title,
        dueDate:req.body.dueDate,
        user:req.user,
        file:req.file.filename,

    }) 
    taskCreate(body , (err, result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:false,
                    message :'Something went wrong'
                })
            }
            res.status(200).json({
                success:true,
                result
            })
        });
}


module.exports.deleteTask = (req,res)=>{
    let taskID = req.params.id
    taskDelete(taskID , (err, result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:false,
                    message :'Something went wrong'
                })
            }
            res.status(200).json({
                success:true,
                result
            })
        });
}

module.exports.getTask = (req,res)=>{
    let userID = req.user
    taskGet(userID , (err, result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:false,
                    message :'Something went wrong'
                })
            }
            res.status(200).json({
                success:true,
                result
            })
        });
}

module.exports.updateTask = (req,res)=>{
    const body=req.body
    let taskID = req.params.id;
    taskUpdate(body , taskID , (err, result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:false,
                    message :'Something went wrong'
                })
            }
            res.status(200).json({
                success:true,
                result
            })
        });
}