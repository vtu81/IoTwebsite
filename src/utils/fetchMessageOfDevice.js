var connect_config = require('src/utils/config.json');
/**
 * Fetch a specific device's messages
 * @returns 'messages', an array of messages similar to the one in 'src/__mocks__/messages.js'
 */
const fetchMessageOfDevice = (clientid) => {
    return new Promise((resolve) => {
        fetch(connect_config.backend_host + '/fetch_message/of_device',{
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
            var data = [];
            for(let i of sql_ret)
            {
            var obj = {};
            obj = i;
            data.push(obj);
            }
            console.log('data: ', data);
            resolve(data);
        })
        })
    });
}
    
export default fetchMessageOfDevice;