const { RateReview } = require('@material-ui/icons');
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST update the password of a specific user */
router.post('/', function(req, res, next) {
  console.log('Backend received post body: ', req.body);

  var sql_command = 'select count(user_name) as num from account where password_hash = ? and user_name = ?';
  query(sql_command, [req.body.old_password_hash, req.body.user_name], function (err, result) {
    if(err)
    {
      console.log('[SELECT ERROR] - ', err.message);
      res.send({
        'success': false,
        'msg': 'Update password falied due to internal server error, please try again later.'
      });
      return;
    }
    else
    {
      if(result[0].num == 1)
      {
        var sql_command = 'update account set password_hash = ? where user_name = ?';
        query(sql_command, [req.body.password_hash, req.body.user_name], function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ', err.message);
            res.send({
              'success': false,
              'msg': 'Update password failed due to internal server error, please try again later.'
            });
            return;
          }
          res.send({
            'success': true,
            'msg': 'Update password successfully!'
          });
        });
      }
      else{
        res.send({
          'success': false,
          'msg': 'Old password not correct! Plase check the old password and try again.'
        });
        return;
      }
    }
  });
});

module.exports = router;
