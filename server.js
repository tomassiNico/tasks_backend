const sqlite3 = require('sqlite3');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

const socketio = require('socket.io');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');
// const tasks = require('./controllers/tasks');

const findUserMiddleware = require('./middlewares/find_user');
const authUserMiddleware = require('./middlewares/auth_user');

app.use(bodyParser.urlencoded({extented: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.use(session({
  secret: ["bjhb3u1g2dv1i4f76wx712v2b7r8b1278461","uiy123bc71280346b123713z,vsduiifv"],
  saveUnitialized: false,
  resave: false
}));

app.use(findUserMiddleware);
app.use(authUserMiddleware);


app.use(tasksRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/', function(req, res){
  res.render('home', {user: req.user});
});

let server = app.listen(3000);
let io = socketio(server);
let sockets = {};

let usersCount = 0;

io.on('connection',function(socket){

  let userId = socket.request._query.loggeduser;
  if(userId) sockets[userId] = socket;
  console.log(sockets);

  //actualiza usuarios en tiempo real
  usersCount++;
  io.emit('count_updated',{count: usersCount});

  socket.on('new_task',function(data){
    if(data.userId){
      let userSocket = sockets[data.userId];
      if(!userSocket) return;

      userSocket.emit('new_task',data);
    }
  });

  socket.on('disconnect', function(){

    Object.keys(sockets).forEach(userId=>{
      let s = sockets[userId];
      if (s.id == socket.id) sockets[userId] = null;
      console.log(sockets);
    });

    usersCount--;
    io.emit('count_updated',{count: usersCount});
  })
});

const client = require('./realtime/client');
