"use strict";
exports.__esModule = true;
exports.B = exports.A = void 0;
// ts支持命名空间，主要是解决命名冲突
// 模块化：提取公共功能，主要是解决代码重用
var A;
(function (A) {
    var dog = /** @class */ (function () {
        function dog(name) {
            this.name = name;
            this.name = name;
        }
        dog.prototype.eat = function () {
            console.log(this.name + '吃骨头');
        };
        return dog;
    }());
    A.dog = dog;
    var cat = /** @class */ (function () {
        function cat(name) {
            this.name = name;
            this.name = name;
        }
        cat.prototype.eat = function () {
            console.log(this.name + '吃鱼');
        };
        return cat;
    }());
    A.cat = cat;
})(A = exports.A || (exports.A = {}));
var B;
(function (B) {
    var dog = /** @class */ (function () {
        function dog(name) {
            this.name = name;
            this.name = name;
        }
        dog.prototype.eat = function () {
            console.log(this.name + '吃骨头');
        };
        return dog;
    }());
    B.dog = dog;
    var cat = /** @class */ (function () {
        function cat(name) {
            this.name = name;
            this.name = name;
        }
        cat.prototype.eat = function () {
            console.log(this.name + '吃鱼');
        };
        return cat;
    }());
    B.cat = cat;
})(B = exports.B || (exports.B = {}));
