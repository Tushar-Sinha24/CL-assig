const {create, getUserByUserEmail} = require('./user.service');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.createUser = (req,res)=>{
    const body=req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password= bcrypt.hashSync(body.password , salt);
        const regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!body.email.match(regex)){
            return res.status(400).json({
                success:false,
                message :'enter valid email'
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
            console.log(result)
            sendTokenResponse(result,200,res);
        });
}


module.exports.loginUser = (req,res)=>{
    const body=req.body;
    getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        const result = bcrypt.compareSync(body.password, results.password);
        console.log(results)
        if (result) {
            sendTokenResponse(results,200,res);
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
}

module.exports.logout =async(req,res,next)=>{
    res.cookie('token','none',{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        data:[]
    })
};



const sendTokenResponse =(user , statusCode,res)=>{
    const token=jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const option={
        expires:new Date(Date.now() +process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };


    if(process.env.NODE_ENV==='production'){
        option.secure=true;
    }

    res.status(statusCode)
    .cookie('token',token,option)
    .json({
        success:true,
        token
    });
}
