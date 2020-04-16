const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
var express = require('express');
const io = require('./socket')();

const app = express();
var http = require('http').createServer(app);

//app.use(morgan('combined'));
app.use(cors({
  /* origin: 'https://meusite.com.br' */
}));
app.use(express.json());
app.use(routes);


const server = http.listen(3333, () => {
  console.log('Porta 3333')
});


