/**
 * Fetch the user's account info
 * @returns 'account', an object of the user's information
 */
 const fetchAccount = (msgid) => {
    return new Promise((resolve) => {
        fetch('/fetch_account',{
            method:'post',
            headers:{
            "Access-Control-Allow-Origin": "*",
            "Accept": 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                'user_name': window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
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
    
export default fetchAccount;