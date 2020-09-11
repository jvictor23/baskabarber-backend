const mongoose = require('../../database');


const barbeiroSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },

    telefone:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required:true,
        unique: true
    },

    senha:{
        type: String,
        required: true,
        select: true
    }

});

const barbeiro = mongoose.model('Barbeiro', barbeiroSchema) ;

module.exports = barbeiro;