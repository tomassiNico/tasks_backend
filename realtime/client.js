const io = require('socket.io-client');
let host = 'http://localhost:3000';

if(process.env.NODE_ENV && process.env.NODE_ENV == 'production'){
  host = 'https://peaceful-mountain-37777.herokuapp.com/';
}

let socket = io.connect(host, {reconect:true});

socket.on('connect',function(){
  console.log("\n\nConectado con server NodeJS\n\n")
});

module.exports = socket;
