io = require('socket.io')();
const connectionDB = require('./database/connection');

io.listen(3335);



const connection = () => io.on("connection", socket => {
  var ip =  socket.request.connection.remoteAddress;
  
  console.log('Nova conexão com o ip: '+ ip);
  socket.on("mensagem", (msg) =>{
    if(msg === "put"){
    /*  const goals = connectionDB('goals')
      .join('projects', 'projects.id', '=', 'goals.project_id') 
      .select(['goals.*',
        'projects.name',
      ])
      .then( function (names) {
        socket.emit("mensagemCallBack", names);
        console.log("SOCKET LOG: GOALS ENVIADOS");
      });
      
      */
    }else if(msg === "post"){
      socket.emit("mensagemCallBack", "post recebido");
    }
  })

  socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
  });
  
  module.exports = connection;