const Barbeiro = require('../model/barbeiro');
const express = require('express');


const router = express.Router();

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
        return res.status(400).send({error: "Não foi possível cadastrar usuario!"});
    }
    
});

module.exports = app => app.use('/barbeiro', router);