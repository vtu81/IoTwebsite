var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST an account to be registered */
router.post('/', function(req, res, next) {
    console.log('Backend received post body: ', req.body);

    var sql_command = 'select count(user_name) as num, user_name from account where user_name = ?';
    query(sql_command, [req.body.user_name], function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('[SELECT RESULT] - ', result[0].num);
        if(result[0].num > 0)
        {
            console.log('Register failed! The user name has already been registered.');
            res.send({
                'success': false,
                'msg': 'Register failed! The user name has already been registered.'
            });
            return;
        }
        else
        {
            sql_command = 'select count(user_name) as num, user_name from account where email = ?';
            query(sql_command, [req.body.email], function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                console.log('[SELECT RESULT] - ', result[0].num);
                if(result[0].num > 0)
                {
                    console.log('Register failed! The email has already been registered.');
                    res.send({
                        'success': false,
                        'msg': 'Register failed! The email has already been registered.'
                    });
                    return;
                }
                else
                {
                    sql_command = 'insert into account values (?, ?, ?, ?)';
                    query(sql_command, [req.body.user_name, req.body.password_hash, req.body.email, req.body.phone_number], function (err, result) {
                        if(err){
                            console.log('[INSERT ERROR] - ', err.message);
                            res.send({
                                'success': false,
                                'msg': 'Register failed due to internal server error, please try again later.'
                            });
                            return;
                        }
                        console.log('[INSERT RESULT] - ', result);
                        res.send({
                            'success': true,
                            'msg': 'Register successfully!'
                        });
                        return;
                    });
                }
            });
        }
    });
    
});

module.exports = router;
