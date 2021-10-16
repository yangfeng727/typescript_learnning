"use strict";
/*
功能：定义一个操作数据库的库 支持 Mysql MongoDB Mssql
需求1：Mysql MongoDB Mssql 功能一样 都有 add update delete get方法
注意：约束统一的规范，以及代码重用

解决方案：需要约束规范所以要定义接口，需要代码重用所以用到泛型

   1.接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范

   2.泛型 通俗理解：泛型就是解决 类 接口 方法的复用性

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlDb = exports.MysqlDb = void 0;
// 定义一个操作 Mysql 数据库的类 注意：要实现泛型接口 这个类也应该是一个泛型类
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
        // 和数据库建立连接在这里实现
        // ...
        // ..
    }
    MysqlDb.prototype.add = function (info) {
        console.log("%c[*test*] " + '重要例子：类型、接口、类 、泛型 综合使用:', "color: red;font-size:13px", info);
        return true;
    };
    MysqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.get = function (id) {
        // throw new Error("Method not implemented.");
        // 这里实现在数据库查询数据并返回一个数组
        // ...
        // ..
        // 这里简单测试，直接返回
        var list = [{
                title: '数据title',
                desc: '这是返回的描述描述'
            }];
        return list;
    };
    return MysqlDb;
}());
exports.MysqlDb = MysqlDb;
// msSql类似
var MssqlDb = /** @class */ (function () {
    function MssqlDb() {
        // 和数据库建立连接在这里实现
        // ...
        // ..
    }
    MssqlDb.prototype.add = function (info) {
        console.log("%c[*test*] " + '重要例子：类型、接口、类 、泛型 综合使用:', "color: red;font-size:13px", info);
        return true;
    };
    MssqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MssqlDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MssqlDb.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MssqlDb;
}());
exports.MssqlDb = MssqlDb;
