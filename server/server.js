// SyntaxError: Cannot use import statement outside a module报错原因和解决方法 - 达维营 - 前端网;https://www.dvy.com.cn/2021/01/24/7021.html

const db = require('./db');
const { batchCheck } = require('./checkFunction');

// (第一步)加载第三方插件：express
const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');

// (第二步)调用express()
const app = express();
//使用中间件解析urlencoded编码形式的请求体参数
app.use(express.urlencoded({ extended: true }));
//使用中间件解析json编码形式的请求体参数
app.use(express.json());
const cors = require('cors');
app.use(cors());


app.use(cookieParser());// 全局中间件
app.use(session({
    secret: '一个签名',
    name: 'account',
    // cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
}));


// 设置监听
// 3000是端口号：在浏览器上通过ip地址+端口号可以访问
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000/');
});

app.get('/batch', (req, res) => {
    db.selectData("select * from campus_account", (data) => {
        batchCheck(data).then((value) => {
            res.send({ code: 200, message: "Success!", total: data.length });
        });
        return;
    }, (err) => {
        console.log(err);
        res.send({ code: 500, message: "Error!", data: err });
        return;
    });
});


app.post('/login', (req, res) => {
    let sql = `select * from account where username = '${req.body.username}' and password = '${req.body.password}'`;
    db.selectData(sql, (data) => {
        if (data.length === 0) {
            res.send({ msg: "success", code: 500 });
            return;
        } else {
            //设置session(注意跨域问题！必须在不跨域的条件下才能设置上session和cookie)
            req.session.uid = data[0].id;
            req.session.username = data[0].username;
            // res.cookie('nickname', results[0].nickname);
            res.send({ msg: "success", code: 200 });
            return;
        }
    }, (err) => {
        console.log(err);
        res.send({ msg: "error", err });
        return;
    });
});

app.post('/selectUserByUsername', (req, res) => {
    let sql = `select * from account where username = '${req.body.username}'`;
    db.selectData(sql, (data) => {
        console.log(data);
        if (data.length === 0) {
            res.send({ msg: "success", code: 200 });
            return;
        } else {
            res.send({ msg: "success", code: 500 });
            return;
        }
    }, (err) => {
        console.log(err);
        res.send({ msg: "error", err });
        return;
    });
});

app.post('/register', (req, res) => {
    let user = req.body;
    let sql = `insert into account values( null, '${user.nickname}', '${user.username}', '${user.password}')`;
    db.insertData(sql, (result) => {
        res.send({ msg: "success", code: 200 });
        return;
    }, (err) => {
        console.log(err);
        res.send({ msg: "error", err });
        return;
    });
});

// app.get('/test', (req, res) => {
//     if (req.session.uid) {
//         console.log(req.session.uid);
//     } else {
//         console.log('没有sessionID');
//     }
// });