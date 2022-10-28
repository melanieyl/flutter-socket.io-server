const express = require('express');
const path = require('path');
require('dotenv').config(); //lee el archivo y establece variables de entorno 

//App de express
const app = express();

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

//canal publico
const publicPath = path.resolve(__dirname, 'public');

//voy a usar mi public path
app.use(express.static(publicPath));

// inicio mi servidor para ecuchar en algun puerto
server.listen(process.env.PORT,(err)=> {
    //me retorna error si el puerto ya esta tomado
  if(err) throw new Error(err);
  //si no sale error 
   console.log('Servidor corriendo en puerto!!', process.env.PORT);
});

