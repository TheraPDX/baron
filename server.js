var config = require(__dirname + '/config');
var watchJob = require(__dirname + '/jobs/watchpaymentjob');
var blockJob = require(__dirname + '/jobs/lastblockjob');
var webhooksJob = require(__dirname + '/jobs/retrywebhooksjob');
var path = require('path');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

require(__dirname + '/db').instantiateDb();
require(__dirname + '/routes')(app);
require('bitstamped');
blockJob.runLastBlockJob();
watchJob.runWatchPaymentsJob();
webhooksJob.runRetryWebhooksJob();
app.listen(config.port);
console.log('Baron listening at http://0.0.0.0:' + config.port);
