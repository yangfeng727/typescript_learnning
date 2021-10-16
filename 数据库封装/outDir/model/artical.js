"use strict";
// 与Artical表映射的类
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticalModel = exports.ArticalClass = void 0;
var db_1 = require("../modules/db");
var ArticalClass = /** @class */ (function () {
    function ArticalClass(param) {
        this.title = param.title;
        this.desc = param.desc;
        this.status = param.status;
    }
    return ArticalClass;
}());
exports.ArticalClass = ArticalClass;
var ArticalModel = new db_1.MysqlDb(); // 约束为UserClass
exports.ArticalModel = ArticalModel;
