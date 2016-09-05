var io = require('socket.io')(),
GPIO   = require('onoff').Gpio,
led    = new GPIO(4, 'out'),
status = false;

function setLEDstatus(ledStatus) {
  led.writeSync(0);
  status = false;
  if(ledStatus) {
    status = true;
    led.writeSync(1);
  }
}

io.on('connection', function(socket){

  io.emit('init', {message:status});

  socket.on('messageFromClient',function(message){
    var response = {message: message.ledStatus};
    setLEDstatus(message.ledStatus);
    io.emit('messageToClient', response);
  });

});

io.listen(3000), {origins: '*:*'};