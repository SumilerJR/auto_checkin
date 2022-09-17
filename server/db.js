// 引入http作为服务器
const http = require("http");
// 引入数据库
const mysql = require("mysql");
let connection = null;

function createConnection() {
    // 连接数据库
    return mysql.createConnection({
        host: 'localhost',         //服务器地址，连接本机可以使用localhost或者127.0.0.1
        user: 'root',              //连接数据库的用户名
        password: 'jiuri957',               //连接数据库的密码
        database: 'checkin',          //数据库的名称
        port: 13306                 //数据库端口号，默认3306，可以省略不写
    });
}


module.exports.insertData = insertData;
module.exports.selectData = selectData;


function insertData(sql, sucCallback, errCallback) {
    connection = createConnection();
    // 打开数据库连接
    connection.connect();
    // 执行简单的数据库插入操作
    // let sql = "insert into account values( null, ?, ?, ?)";
    // 执行插入操作
    connection.query(sql, function (error, result) {
        if (error) {
            errCallback(error);
        } else {
            sucCallback(result);
        }
    });
    // 释放数据库连接
    connection.end();
}


// 查询操作，封装函数，查询当前表的所有数据
function selectData(sql, sucCallback, errCallback) {
    connection = createConnection();
    // 打开数据库连接
    connection.connect();
    // 编写sql语句
    // let sql = "select * from " + tableName;
    // 执行sql，并处理执行的结果，查询的结果在results变量中，results其实是一个数组
    connection.query(sql, function (error, results, fields) {
        if (error) {
            errCallback(error);
        } else {
            sucCallback(results);
        }
    });
    // 释放数据库连接
    connection.end();
}
