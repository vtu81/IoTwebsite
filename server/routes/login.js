var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST an account to be logined */
router.post('/', function(req, res, next) {
    console.log('Backend received post body: ', req.body);

    var sql_command = 'select count(user_name) as num, user_name from account where email = ? and password_hash = ?';
    query(sql_command, [req.body.email, req.body.password_hash], function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    console.log('[SELECT RESULT] - ', result[0].num);
    res.send(result);
    });
});

module.exports = router;
