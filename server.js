var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./server/config');

var index = require('./server/routes/index');
var tasks = require('./server/routes/tasks');

var app = express();

app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', index);
app.use('/api', tasks);


app.listen(config.get('port'), function() {
  console.log('Server on port ' + config.get('port'));
});
