const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000', {reconect:true});

socket.on('connect',function(){
  console.log("\n\nConectado con server NodeJS\n\n")
});

module.exports = socket;
