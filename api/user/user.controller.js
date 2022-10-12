const {create} = require('./user.service');
const bcrypt = require('bcryptjs')

module.exports.createUser = (req,res)=>{
    const body=req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password= bcrypt.hashSync(body.password , salt);
        const regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!body.email.match(regex)){
            return res.status(400).json({
                success:false,
                message :'Something went wrong'
            })
        }
        create(body , (err, result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:false,
                    message :'Something went wrong'
                })
            }
            return res.status(201).json({
                success:true,
                data:result
            })
        });
}

