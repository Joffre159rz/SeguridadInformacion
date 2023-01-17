const controller={};
controller.list=(req,res)=>{
   req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM datos',(err,datos)=>{
            if(err){
                res.json(err);
            }
            // console.log(datos);
            res.render('datos',{
                data:datos
            })
        })
   });
};
controller.save=((req,res)=>{
    let data=req.body;
    data.msj=(data.msj.toUpperCase());
    let msj_encriptado={msj_encriptado:cifrar2(data.msj,data.llave)};
    let dataunida=Object.assign(data,msj_encriptado);
    req.getConnection((err,conn)=>{
        conn.query('Insert into datos set ?',[dataunida],(err,datos)=>{
            res.redirect('/')
        })
    })
})
controller.edit=((req,res)=>{
    const {id}=req.params;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM datos where id=?',[id],(err,datos)=>{
            res.render('datos_edit',{
                data:datos[0]
            })
        })
    })
})
controller.update=((req,res)=>{
    const {id}=req.params;
    const data=req.body;
    data.msj=(data.msj.toUpperCase());
    data.msj_encriptado=cifrar(data.msj,data.llave)
    req.getConnection((err,conn)=>{
        conn.query('update datos set ? where id=?',[data,id],(err,datos)=>{
            res.redirect('/')
        })
    })

})
controller.delete=((req,res)=>{
    const {id}=req.params;
    req.getConnection((err,conn)=>{
        conn.query('delete from datos where id=?',[id],(err,datos)=>{
            res.redirect('/')
        })
    })
})
controller.verificar=((req,res)=>{
    const {id}=req.params;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM datos where id=?',[id],(err,datos)=>{
            let msj_desencriptado={msj_desencriptado:descifrar(datos[0].msj_encriptado,datos[0].llave)};
            let dataunida=Object.assign(datos[0],msj_desencriptado);
            console.log(dataunida);
            res.render('datos_verificar',{
                data:dataunida
            })
        })
    })
})

function cifrar(texto,desplazamiento){
    let resultado=""
    let letras="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    desplazamiento=(desplazamiento%26+26)%26;
    if(texto){
        for(let i=0;i<texto.length;i++){
            if(letras.indexOf(texto[i])!=-1){
                let posicion=((letras.indexOf(texto[i])+desplazamiento)%26)
                resultado+=letras[posicion];
            }else{
                resultado+=texto[i]
            }
        }
    }
    return resultado;
}
function cifrar2(texto,desplazamiento){
    if(!texto)
        return "";
    const letras="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    desplazamiento=(desplazamiento%26+26)%26;
    return texto.replace(/[A-Z]/ig,c=>letras[(letras.indexOf(c)+desplazamiento)%26])
}
function descifrar(texto,desplazamiento){
    if(!texto)
        return "";
    const letras="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    desplazamiento=(desplazamiento%26-26)%26;
    return texto.replace(/[A-Z]/ig,c=>letras[(letras.indexOf(c)-desplazamiento)%26])
}

module.exports=controller