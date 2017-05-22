var express = require('express');
var router = express.Router();
var EventProxy = require('eventproxy');
var connect = require('./base.js');
var SQL = require('../sql/student.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//TODO 区分开文件路由和请求
router.get('/article', function (req, res, next) {
    res.render('article', {
        title: 'Express'
    });
});

router.get('/getStudentInfo', function (req, res, next) {
    var ep = new EventProxy();
    connect({
        sql: SQL.getStudentInfo,
        cb: function (result) {
            ep.emit('getStudentInfo', result);
        }
    });
    ep.on("getStudentInfo", function (data) {
         res.json(data);
    });
});

module.exports = router;
