var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

import routes from './routes';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/rooms',routes.rooms);
app.use('/api/users',routes.users);
app.use('/api/movies',routes.movies);

app.listen(3000,() => console.log('Server started'));
