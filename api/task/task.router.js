const {createTask , deleteTask , getTask , updateTask} = require('./task.controller');
const router = require('express').Router(); 
const multer =require('multer')

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file , cb){
            cb(null , "uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+'.pdf')
        }
    })
}).single("user_file")

const {protect} = require('../../middileware/getLoggedId');

router.post('/createTask',protect ,upload, createTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

router.get('/getalltask',protect, getTask);

module.exports = router;