var mysql  = require('mysql');

var mysql_connect_info = {
    host     : 'secret',
    user     : 'secret',
    password : 'secret',
    database : 'secret',
    port     : 3306
}

var pool = mysql.createPool({
    host     : 'secret',
    user     : 'secret',
    password : 'secret',
    database : 'secret',
    port     : 3306
});

// var mysql_connection = mysql.createConnection(mysql_connect_info);
// mysql_connection.connect();

module.exports = {
    mysql_connect_info,
    // mysql_connection,
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i = 0; i < arguments.length; i++){
            args.push(arguments[i]);
        }
        // console.log(args);
        var callback = args[args.length - 1]; // last arg is callback
        pool.getConnection(function(err, connection) {
            if(err)
            {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2)
            {
                sql_args = args[1];
            }
            connection.query(args[0], sql_args, function(err, results)
            {
                connection.release(); // always put connection back in pool after last query
                if(err)
                {
                    // console.log(err);
                    return callback(err);
                }
                callback(null, results);
            });
        });
    }
}