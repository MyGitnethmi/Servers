const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employee');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(function (request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/employees', employeeRouter);

app.get('/', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('Hello from the server');
  response.end();
});

app.listen(PORT, () => {
  console.log('Server is running on localhost:', PORT);
})

app.use(express.urlencoded({ extended: false }));
