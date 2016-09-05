//var server = require('http').createServer();
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// button is attaced to pin 17, led to 18
    var GPIO = require('onoff').Gpio,
    led      = new GPIO(18, 'out'),
    button   = new GPIO(17, 'in', 'both');

// define the callback function
function light(err, state) {
console.log('err:',err);
console.log('state:', state);
  // check the state of the button
  // 1 == pressed, 0 == not pressed
  if(state == 1) {
    // turn LED on
    led.writeSync(1);
  } else {
    // turn LED off
    led.writeSync(0);
  }

}

// pass the callback function to the
// as the first argument to watch()
button.watch(light);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('apagon', function(msg){
    console.log('apagon: ' + msg);
    io.emit('apagon', 'msg apagon');
    //io.emit('apagon', { for: 'everyone' });
    //socket.broadcast.emit('apagon');
  });

  socket.on('iluminacion', function(msg){
    console.log('iluminacion: ' + msg);
    io.emit('iluminacion', 'msg iluminacion');
    //socket.broadcast.emit('iluminacion');
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
