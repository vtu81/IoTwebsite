var mqtt = require('mqtt');
var sql = require('../utils/sql.js');
var query = sql.query;
var mqtt_config = require('./mqtt_config.json');

var mqtt_client = mqtt.connect(mqtt_config.host);

mqtt_client.on('connect', () => {
    mqtt_client.subscribe(mqtt_config.topic, (err) => {
        if(!err)
        {
            console.log('Successflly subscribed to topic', mqtt_config.topic);
        }
    })
})

mqtt_client.on('message', (topic, msg) => {
    msg_str = msg.toString();
    msg_obj = JSON.parse(msg_str);
    var date = new Date(msg_obj.timestamp);
    var time =  (date.getFullYear()) + "-" + 
                (date.getMonth() + 1) + "-" +
                (date.getDate()) + " " + 
                (date.getHours()) + ":" + 
                (date.getMinutes()) + ":" + 
                (date.getSeconds());
    msg_obj.timestamp = time;
    console.log(msg_obj);
    
    sql_command = 'insert into message (alert, clientid, info, lat, lng, timestamp, value) values (?, ?, ?, ?, ?, ?, ?)';
    query(sql_command, [msg_obj.alert, msg_obj.clientId, msg_obj.info, msg_obj.lat, msg_obj.lng, msg_obj.timestamp, msg_obj.value], function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('[INSERT RESULT] - ', result);
    });
})

module.exports = mqtt_client;