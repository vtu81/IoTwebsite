import { OpenInBrowser } from "@material-ui/icons";
var connect_config = require('src/utils/config.json');

const fetchDeviceList = () => {
    return new Promise((resolve) => {
        fetch(connect_config.backend_host + '/fetch_device',{
            method:'post',
            headers:{
            "Access-Control-Allow-Origin": "*",
            "Accept": 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({'user_name': window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest'})
        }).then(res=>{
        res.json().then((sql_ret)=>{
            console.log(sql_ret);
            var data = [];
            for(let i in sql_ret)
            {
            var obj = {};
            obj.id = sql_ret[i].id;
            obj.device_name = sql_ret[i].device_name;
            obj.clientid = sql_ret[i].clientid;
            obj.offline_at = sql_ret[i].offline_at;
            obj.online_at = sql_ret[i].online_at;
            obj.created = sql_ret[i].created;
            if(sql_ret[i].offline_at != null) obj.state = 'Offline';
            else obj.state = 'Online';
            data.push(obj);
            }
            console.log('data: ', data);
            resolve(data);
        })
        })
    });
}

export default fetchDeviceList;