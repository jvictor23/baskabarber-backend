const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const barbeiroSchema = new mongoose.Schema({

    nome:{
        type: String,
        required: true
    },

    telefone:{
        type: String,
        required: true,
    },

    endereco:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required:true,
        unique: true
    },

    senha:{
        type: String,
        required: true,
        select: false
    }

});

barbeiroSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha,10);
    this.senha = hash;
    
    next();
});


const barbeiro = mongoose.model('Barbeiro', barbeiroSchema) ;


module.exports = barbeiro;