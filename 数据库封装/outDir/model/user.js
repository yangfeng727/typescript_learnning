"use strict";
// 与User表映射的类
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserClass = void 0;
var db_1 = require("../modules/db");
var UserClass = /** @class */ (function () {
    function UserClass() {
    }
    return UserClass;
}());
exports.UserClass = UserClass;
var UserModel = new db_1.MysqlDb(); // 约束为UserClass
exports.UserModel = UserModel;
