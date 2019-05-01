var express = require('express');
var bodyParser = require('body-parser');

import routes from './routes';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/rooms',routes.rooms);
app.use('/api/users',routes.users);

app.listen(process.env.PORT || 3000,() => console.log('Server started'));
