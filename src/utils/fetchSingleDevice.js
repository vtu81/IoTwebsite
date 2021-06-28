var connect_config = require('src/utils/config.json');

const fetchSingleDevice = (clientid) => {
    return new Promise((resolve) => {
        fetch(connect_config.backend_host + '/fetch_device/single',{
            method:'post',
            headers:{
            "Access-Control-Allow-Origin": "*",
            "Accept": 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                'user_name': window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
                'clientid': clientid,
            })
        }).then(res=>{
        res.json().then((sql_ret)=>{
            console.log(sql_ret);
            var obj = {};
            for(let i in sql_ret)
            {
                obj.id = sql_ret[i].id;
                obj.device_name = sql_ret[i].device_name;
                obj.clientid = sql_ret[i].clientid;
                obj.offline_at = sql_ret[i].offline_at;
                obj.online_at = sql_ret[i].online_at;
                obj.created = sql_ret[i].created;
                if(sql_ret[i].offline_at != null) obj.state = 'Offline';
                else obj.state = 'Online';
            }
            console.log('obj: ', obj);
            resolve(obj);
        })
        })
    });
}

export default fetchSingleDevice;