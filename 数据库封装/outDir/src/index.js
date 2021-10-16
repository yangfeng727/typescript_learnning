"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../model/user");
var artical_1 = require("../model/artical");
// ------ user 相关 ------
var userOne = new user_1.UserClass();
userOne.username = '张三';
userOne.password = '123123';
user_1.UserModel.add(userOne); // 数据库新增
var result = user_1.UserModel.get(12); // 调用数据查询
console.log('数据库查询user表', result);
//  ------  artical 相关  ------
var articalOne = new artical_1.ArticalClass({
    title: '百度新闻',
    desc: 'artical描述'
});
artical_1.ArticalModel.add(articalOne); // 数据库新增
var result2 = artical_1.ArticalModel.get(13); // 调用数据查询
console.log('数据库get查询artical表', result2);
