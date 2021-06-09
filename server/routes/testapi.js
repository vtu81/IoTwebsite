var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const devices_info = [
    {id: 1, deviceName: 'Macbook', deviceID: '1944'},
    {id: 2, deviceName: 'Apple TV', deviceID: '8562'},
    {id: 3, deviceName: 'iPhone', deviceID: '1247'},
  ];
  res.json(devices_info)
});

module.exports = router;
