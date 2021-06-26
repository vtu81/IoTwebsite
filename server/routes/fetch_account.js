const { RateReview } = require('@material-ui/icons');
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST the account info of a specific user */
router.post('/', function(req, res, next) {
  console.log('Backend received post body: ', req.body);

  var sql_command = 'select user_name, email, phone_number from account where user_name = ?';
  query(sql_command, [req.body.user_name], function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ', err.message);
      throw err;
      return;
    }
    res.send(result);
  });
});

/* GET vtu's account info (for debug) */
router.get('/get', function(req, res, next) {
  var sql_command = 'select user_name, email, phone_number from account where user_name = ?';
  query(sql_command, ['vtu'], function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ', err.message);
      throw err;
      return;
    }
    res.send(result);
  });
});

module.exports = router;
