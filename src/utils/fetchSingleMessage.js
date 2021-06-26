/**
 * Fetch a single message with a specific msgid
 * @returns 'message', a message similar to a member of the one in 'src/__mocks__/messages.js'
 */
const fetchSingleMessage = (msgid) => {
return new Promise((resolve) => {
    fetch('/fetch_message/single',{
        method:'post',
        headers:{
        "Access-Control-Allow-Origin": "*",
        "Accept": 'application/json',
        "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            'user_name': window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
            'msgid': msgid,
        })
    }).then(res=>{
    res.json().then((sql_ret)=>{
        console.log(sql_ret);
        var obj = {};
        for(let i of sql_ret)
        {
            obj = i;
        }
        console.log('obj: ', obj);
        resolve(obj);
    })
    })
});
}

export default fetchSingleMessage;