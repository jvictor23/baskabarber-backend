const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/baskabarber', {useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(res=>{
    console.log("Banco mongodb conectado");
});

mongoose.Promise = global.Promise;

module.exports = mongoose;