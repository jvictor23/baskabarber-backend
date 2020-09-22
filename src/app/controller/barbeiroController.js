const Barbeiro = require('../model/barbeiro');
const express = require('express');
const middleware = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')


const router = express.Router();

//router.use(middleware);

router.get('/get', async(req,res)=>{
    return res.send({ok: true});
})

router.post('/register', async(req, res)=>{
    const {email, telefone} = req.body;

    try {
        if(await Barbeiro.findOne({email})){
            return res.status(400).send({error: "Este email já está cadastrado!"});
        }

        if(await Barbeiro.findOne({telefone})){
            return res.status(400). send({error: "Este número de telefone já está cadastrado!"});
        }
         

        const barbeiro = await Barbeiro.create(req.body);
        return res.send(barbeiro);

    } catch (error) {
        return res.status(400).send({error: "Não foi possível cadastrar usuario!", error: error});
    }
    
});

function gereteToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}


router.post('/login', async(req,res)=>{
    
    const {email, senha} = req.body;
    try {
        const barbeiro = await Barbeiro.findOne({email}).select("+senha");
        if(!barbeiro){
            return res.status(400).send({error: "Usuário não encontrado !"});
        }

        if(!await bcrypt.compare(senha, barbeiro.senha)){
            return res.status(400).send({error: "Senha incorreta"});
        }
        


        barbeiro.senha = undefined;

        return res.send({
            barbeiro,
            token: gereteToken({ id: barbeiro.id }),
        });

    } catch (error) {
        return res.status(400).send({error: error});
    }
});

module.exports = app => app.use('/barbeiro', router);