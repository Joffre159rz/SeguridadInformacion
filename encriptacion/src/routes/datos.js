const express =require('express');
const router=express.Router();
const datoscontroller=require('../controllers/datoscontroller')
router.get('/',datoscontroller.list)
router.post('/add',datoscontroller.save)
router.get('/delete/:id',datoscontroller.delete)
router.get('/update/:id',datoscontroller.edit)
router.post('/update/:id',datoscontroller.update)
router.get('/verificar/:id',datoscontroller.verificar)
module.exports=router;
