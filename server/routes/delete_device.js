var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var sql = require('../utils/sql.js');
var query = sql.query;

/* POST a device to be deleted */
router.post('/', function(req, res, next) {
    console.log('Backend received post body: ', req.body);
    
    // Check if there is such a device
    var sql_command = 'select count(clientid) as num from mqtt_client where clientid = ?';
    query(sql_command, [req.body.clientid], function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            throw err;
            return;
        }
        console.log('[SELECT RESULT] - ', result[0].num);
        if(result[0].num <= 0)
        {
            console.log('Delete device failed! There is no such device with id \'' + req.body.clientid + '\'.');
            res.send({
                'success': false,
                'msg': 'Delete device failed! There is no such device with id \'' + req.body.clientid + '\'.'
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
                        'msg': 'Delete device failed due to internal server error, please try again later.'
                    });
                    return;
                }
                console.log('[SELECT RESULT] - ', result);
                if(result[0].num > 0)
                {
                    sql_command = 'delete from device_info where device_name = ? and clientid = ? and user_name = ?';
                    query(sql_command, [req.body.device_name, req.body.clientid, req.body.user_name], function (err, result) {
                        if(err){
                            console.log('[DELETE ERROR] - ', err.message);
                            res.send({
                                'success': false,
                                'msg': 'Delete device name failed due to internal server error, please try again later.'
                            });
                            return;
                        }
                        console.log('[DELETE RESULT] - ', result);
                        res.send({
                            'success': true,
                            'msg': 'Delete device successfully!'
                        });
                        return;
                    });
                }
            });
        }
    });
});

module.exports = router;
