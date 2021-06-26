const { RateReview } = require('@material-ui/icons');
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST the messages of devices of a specific user */
router.post('/', function(req, res, next) {
  console.log('Backend received post body: ', req.body);

  var sql_command = 'select alert, msgid, device_name, clientid, info, value, lat, lng, DATE_FORMAT(timestamp,\'%Y-%m-%d %H:%i:%s\') as timestamp from message natural join device_info where user_name = ? order by timestamp desc';
  query(sql_command, [req.body.user_name], function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ', err.message);
      throw err;
      return;
    }
    for(obj of result) // bit -> int
    {
      obj.alert = obj.alert.readUInt8();
    }
    res.send(result);
  });
});

/* POST a single message */
router.post('/single', function(req, res, next) {
  console.log('Backend received post body: ', req.body);

  var sql_command = 'select alert, msgid, device_name, clientid, info, value, lat, lng, DATE_FORMAT(timestamp,\'%Y-%m-%d %H:%i:%s\') as timestamp from message natural join device_info where user_name = ? and msgid = ? order by timestamp desc';
  query(sql_command, [req.body.user_name, req.body.msgid], function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ', err.message);
      throw err;
      return;
    }
    for(obj of result) // bit -> int
    {
      obj.alert = obj.alert.readUInt8();
    }
    res.send(result);
  });
});

/* POST messages of a device */
router.post('/of_device', function(req, res, next) {
  console.log('Backend received post body: ', req.body);

  var sql_command = 'select alert, msgid, device_name, clientid, info, value, lat, lng, DATE_FORMAT(timestamp,\'%Y-%m-%d %H:%i:%s\') as timestamp from message natural join device_info where user_name = ? and clientid = ? order by timestamp desc';
  query(sql_command, [req.body.user_name, req.body.clientid], function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ', err.message);
      throw err;
      return;
    }
    for(obj of result) // bit -> int
    {
      obj.alert = obj.alert.readUInt8();
    }
    res.send(result);
  });
});

/* GET vtu's devices' messages (for debug) */
router.get('/get', function(req, res, next) {
  var sql_command = 'select alert, msgid, device_name, clientid, info, value, lat, lng, DATE_FORMAT(timestamp,\'%Y-%m-%d %H:%i:%s\') as timestamp from message natural join device_info where user_name = ? order by timestamp desc';
  query(sql_command, ['vtu'], function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    for(obj of result) // bit -> int
    {
      obj.alert = obj.alert.readUInt8();
    }
    res.send(result);
  });
});

module.exports = router;
