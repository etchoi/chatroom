var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var route = require('./routes/index.js')(app);

var server = app.listen(8000, function(){
  console.log('Listening on port 8000');
})

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  console.log('socket working');
  //receive and send new user
  socket.on('got_a_new_user', function(data){
    io.emit('joined_chat', data);
  })
  //receive and send new msg
  socket.on('got_a_new_message', function(data){
    io.emit('incoming_message', data);
  })

})
