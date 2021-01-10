var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var cors = require('cors');
var path = require('path');
const bodyParser = require('body-parser');

var app = express();
const databaseUri = 'mongodb+srv://AmooHashem:1273067185Ali@cluster0.qr5df.mongodb.net/HW3?retryWrites=true&w=majority'

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
});

app.use(cors());
app.use('/parse', api); // protect /parse
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/', require('./routes'));

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});