module.exports.batchCheck = batchCheck;

const request = require('request');


async function autoCheckin(account) {
    let rawHeaders = await requestLogin(account);
    let state = await requestCheck(rawHeaders);
    switch (state) {
        case '1':
            return '一键打卡成功';
        case '2':
            return '没有健康填报，不能一键打卡';
        case '3':
            return '今天打过卡了';
        case '4':
            return '问卷有更新，请重新填报';
        default:
            throw new Error('打卡失败');
    }
};


/**
 * 登录请求函数
 * @param {用户对象，需要username、password} account 
 * @returns promise对象，resolve登录的响应头
 */
function requestLogin(account) {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'https://tb.gdei.edu.cn/login',
            "rejectUnauthorized": false,
            form: { username: account.username, password: account.password }
        }, function (error, response, body) {
            body = JSON.parse(body);//这里需要把字符串转为对象
            if (!error && response.statusCode == 200) {
                if (body.code === 0) {
                    resolve(response.rawHeaders);
                } else {
                    reject(body.msg);
                }
            } else {
                reject(body.msg);
            }
        });
    });
};


/**
 * 登录后的打卡请求函数
 * @param {requestLogin函数后的cookie值} cookie 
 * @returns promise对象，resolve请求的结果
 */
function requestCheck(cookie) {
    return new Promise((resolve, reject) => {
        // console.log(value);
        request.get({
            url: "https://tb.gdei.edu.cn/system/yqdc/yjtb?_=" + Date.now(),
            "rejectUnauthorized": false,
            "headers": {
                'cookie': cookie,
            },
        },
            function (error, response, body) {
                if (!error) {
                    //response是响应体，body是请求体数据，类似于python中res的text
                    // console.log(response)
                    // console.log(body)
                    resolve(body);
                }
            });
    });
};


/**
 * 机器人请求函数
 * @param {向机器人请求的文本} text 
 */
function requestRobot(text) {
    request('https://2525.in/send/?msgqq=753658584&token=63619a3dbb65748f1e3ce97b493fe9b6&type=1&text=' + encodeURI(text), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('机器人请求正常！');
        } else {
            console.log('机器人请求失败！', body);
        }
    });
}

/**
 * 批量打卡的异步函数
 * @param {用户对象数组，对象必须有username、password} accounts 
 * @returns 
 */
async function batchCheck(accounts) {
    let success = 0, fail = 0;
    let text = '';
    for (let account of accounts) {
        // 对每个自动打卡进行异步操作
        await autoCheckin(account).then((value) => {
            success++;
            text += `${account.id}, ${account.name}, ${value}\n`;
        }).catch((err) => {
            fail++;
            text += `${account.id}, ${account.name}, ${err}\n`;
        });
    }
    text += `打卡成功：${success}人，打卡失败：${fail}人，共：${accounts.length}人`;
    console.log(text);
    requestRobot(text);
    return text;
};