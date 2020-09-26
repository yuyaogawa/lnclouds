var express = require('express');
var router = express.Router();
var execSync = require('child_process').execSync;

/* GET home page. */
router.get('/', function(req, res, next) {
    var hostname = 'vega-422';
    var json = execSync('curl -s https://bitclouds.sh/status/' + hostname).toString();
    var status = JSON.parse(json);

    var json2 = execSync('curl -s https://bitclouds.sh/topup/' + hostname + '/1000').toString();
    var topup = JSON.parse(json2);

    const DIR = '/root/NDLC/NDLC.CLI/bin/Release/netcoreapp3.1/';
    const eventfullname = 'olivia/elections';
    const oracleList = execSync(DIR + 'ndlc-cli -testnet --datadir ' + DIR +'Olivia oracle list').toString();
    let currentEvent = execSync(DIR + 'ndlc-cli -testnet --datadir ' + DIR +'Olivia event show ' + eventfullname).toString();
    currentEvent = currentEvent.replace(/\r?\n/g, '<br>');

    var data = { 'status': status.hours_left,
                 'topup': topup.invoice,
                 'oracleList': oracleList,
                 'currentEvent': currentEvent,
             };
    res.render('index', {data});
});

module.exports = router;
