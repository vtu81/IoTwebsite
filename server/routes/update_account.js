const { RateReview } = require('@material-ui/icons');
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST update the account info of a specific user */
router.post('/', function(req, res, next) {
  console.log('Backend received post body: ', req.body);

  var sql_command = 'update account set email = ?, phone_number = ? where user_name = ?';
  query(sql_command, [req.body.email, req.body.phone_number, req.body.user_name], function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ', err.message);
      res.send({
        'success': false,
        'msg': 'Update account info failed due to internal server error, please try again later.'
      });
      throw err;
      return;
    }
    res.send({
      'success': true,
      'msg': 'Update account info successfully!'
    });
  });
});

module.exports = router;
