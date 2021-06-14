var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST a device to be added */
router.post('/', function(req, res, next) {
    console.log('Backend received post body: ', req.body);

    // Check if there is such a device
    var sql_command = 'select count(clientid) as num from mqtt_client where clientid = ?';
    query(sql_command, [req.body.clientid], function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('[SELECT RESULT] - ', result[0].num);
        if(result[0].num <= 0)
        {
            console.log('Add device failed! There is no such device with id \'' + req.body.clientid + '\'.');
            res.send({
                'success': false,
                'msg': 'Add device failed! There is no such device with id \'' + req.body.clientid + '\'.'
            });
            return;
        }
        else
        {
            // Check if the user has set an alias for the device before
            sql_command = 'select count(clientid) as num from device_info where clientid = ? and user_name = ?';
            query(sql_command, [req.body.clientid, req.body.user_name], function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send({
                        'success': false,
                        'msg': 'Add device failed due to internal server error, please try again later.'
                    });
                    return;
                }
                console.log('[SELECT RESULT] - ', result);
                if(result[0].num > 0)
                {
                    sql_command = 'update device_info set device_name = ? where clientid = ? and user_name = ?';
                    query(sql_command, [req.body.device_name, req.body.clientid, req.body.user_name], function (err, result) {
                        if(err){
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send({
                                'success': false,
                                'msg': 'Update device name failed due to internal server error, please try again later.'
                            });
                            return;
                        }
                        console.log('[UPDATE RESULT] - ', result);
                        res.send({
                            'success': true,
                            'msg': 'Update device name successfully!'
                        });
                        return;
                    });
                }
                else
                {
                    // Otherwise, create a new entry
                    sql_command = 'insert into device_info values (?, ?, ?)';
                    query(sql_command, [req.body.clientid, req.body.device_name, req.body.user_name], function (err, result) {
                        if(err){
                            console.log('[INSERT ERROR] - ', err.message);
                            res.send({
                                'success': false,
                                'msg': 'Add device failed due to internal server error, please try again later.'
                            });
                            return;
                        }
                        console.log('[INSERT RESULT] - ', result);
                        res.send({
                            'success': true,
                            'msg': 'Add device successfully!'
                        });
                        return;
                    });
                }
            });
        }
    });
});

module.exports = router;
