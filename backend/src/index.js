const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
const path = require('path');
var express = require('express');
const io = require('./config/socket')();

const app = express();
var http = require('http').createServer(app);

app.use(morgan('combined'));
app.use(cors({
  /* origin: 'https://meusite.com.br' */
}));

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'img', 'uploads')));

app.use(express.json());
app.use(routes);


const server = http.listen(3333, () => {
  console.log('Porta 3333')
});


