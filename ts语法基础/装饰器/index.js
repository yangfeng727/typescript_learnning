"use strict";
/*
    装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上
    通俗讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能
    常见装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器
    装饰器是过去几年js最大成就之一，已是Es7的标准特性之一

    装饰器写法：普通装饰器（无法传参），装饰器工厂（可传参）
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/*
 1.类装饰器
*/
console.log('---------- 1.类装饰器---------');
// 1.1 普通装饰器（无法传参）
function logClass(params) {
    console.log(params);
    params.prototype.apiUrl = 'http://localhost:8080/';
}
var httpClass = /** @class */ (function () {
    function httpClass() {
    }
    httpClass = __decorate([
        logClass
    ], httpClass);
    return httpClass;
}());
var a = new httpClass();
console.log(a.apiUrl);
// 1.2 装饰器工厂（可传参）
function logClass2(params) {
    return function (target) {
        console.log(params); // hello // 这是传入装饰器的参数
        console.log(target); // ƒ httpClass2() {}  这个是装载装饰器的类
        target.prototype.apiUrl = 'abc';
    };
}
var httpClass2 = /** @class */ (function () {
    function httpClass2() {
    }
    httpClass2 = __decorate([
        logClass2('hello')
    ], httpClass2);
    return httpClass2;
}());
var b = new httpClass2();
console.log(b.apiUrl);
// 1.3 使用装饰器更改类里面的构造函数、属性、方法
function dFn(target) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(n) {
            var _this = _super.call(this, n) || this;
            _this.name2 = '这是新增的属性';
            return _this;
        }
        class_1.prototype.say = function () {
            console.log(this.name + ' say from derector', this.name2); // log: 张三 say from derector 这是新增的属性
        };
        return class_1;
    }(target));
}
var mClass = /** @class */ (function () {
    function mClass(n) {
        this.name = n;
    }
    mClass.prototype.say = function () {
        console.log(this.name + 'say hello');
    };
    mClass = __decorate([
        dFn
    ], mClass);
    return mClass;
}());
var ddd = new mClass('张三');
ddd.say();
/*
 2.属性装饰器
   属性装饰器表达式会在运行时当作函数被调用，传入下列两个参数：
   1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   2.成员的名字
*/
console.log('---------- 2.属性装饰器---------');
function propertyDre(param) {
    return function (target, attr) {
        console.log(target); // 类的原型对象
        console.log(attr); // 类的成员属性
        target[attr] = param; // 更改值
    };
}
var dre = /** @class */ (function () {
    function dre() {
    }
    dre.prototype.getData = function () {
        console.log('属性装饰器，在装饰器中修改属性的值：', this.name);
    };
    __decorate([
        propertyDre('张三')
    ], dre.prototype, "name", void 0);
    return dre;
}());
var os = new dre();
os.getData();
/*
 3.方法装饰器
   它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
   方法装饰器会在运行时传入下列3个参数：
   1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   2.成员的名字
   3.成员的属性描述符
*/
console.log('---------- 3.方法装饰器---------');
function httpDirector(param) {
    return function (target, methodName, descriptor) {
        console.log(target); // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
        console.log(methodName); // 成员的名字
        console.log(descriptor); // 成员的属性描述符 descriptor.value 是方法的具体内容
        // --1--可扩展类的属性
        target.name = '张三';
        // --2--可扩展类的方法
        target.run = function () {
            console.log('run');
        };
        // --3--下面 "修改" 传过来的方法,将参数全部转为string后再传给原来的方法
        var oldMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(this, args, '这是装饰器里面的内容');
            var vals = args.map(function (item) {
                return String(item);
            });
            // 修改参数后再执行原来的逻辑
            oldMethod.apply(this, args); // 必须更改this指向
        };
    };
}
var httpClient = /** @class */ (function () {
    function httpClient() {
        this.mine = 'ddddd'; // 内部公有属性
    }
    httpClient.prototype.getData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(this.mine);
        console.log(args, '这是getData里的内容');
    };
    __decorate([
        httpDirector('http:www.baidu.com')
    ], httpClient.prototype, "getData", null);
    return httpClient;
}());
var ou = new httpClient();
// 扩展内容
console.log(ou.name);
ou.run();
// 修改方法
ou.getData(123, 'ssss');
/*
4.方法参数装饰器 --- 这个不常用
   参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下列3个参数：
   1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   2.参数的名字。
   3.参数在函数参数列表中的索引。
*/
console.log('---------- 4.方法参数装饰器---------');
function gg(param) {
    return function (target, methodName, index) {
        console.log(param);
        console.log(target);
        console.log(methodName);
        console.log(index); // 参数在函数参数列表中的索引
    };
}
var ggClass = /** @class */ (function () {
    function ggClass() {
    }
    ggClass.prototype.getData = function (arg, arg2) {
        console.log('getData里面的内容', arg, arg2);
    };
    __decorate([
        __param(0, gg('参数一')),
        __param(1, gg('参数二'))
    ], ggClass.prototype, "getData", null);
    return ggClass;
}());
var ag = new ggClass();
ag.getData(12, '啦啦啦');
/*
5.装饰器执行顺序
 // 属性 > 方法 > 方法参数 > 类
 // 如果有多个同样的装饰器，它会先执行后面的
*/
