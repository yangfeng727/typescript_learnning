"use strict";
// 1. es6直接写ts里面
// import testModule from './src/lib/test'
// console.log(`姓名:${testModule.name} 年龄:${testModule.age} 性别:${testModule.sex}`)
// testModule.myFN('引入第三方包并自定义声明文件')
// // 2.第三方包js文件写声明文件
// import myModule from './src/lib/myModule'
// // let ob = myModule as any
// console.log(`姓名:${myModule.name} 年龄:${myModule.age} 性别:${myModule.sex}`)
// import moduleLib from './src/lib/myModule.js';
// moduleLib.doSomething();
// 声明文件 
// --------------------- statement.d.ts相关 start ---------------------
// import './src/types/statement' // 应该可以不引入的
// /// <reference types="./src/types/statement" /> // ??? 没效果
// const run:Teacher<StudentSM> = {
//     name:'harry',
//     age:20
// }
// 声明的全局对象赋值
// MyPoint.x = 11
// MyPoint.y = 22
// --------------------- statement.d.ts相关 end ---------------------
var Student = /** @class */ (function () {
    // 在构造函数的参数上使用public等同于创建了同名的成员变量，如：this.firstName,this.middleInitial,this.lastName
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
var greeter = function (person) {
    return "Hello, " + person.firstName + " " + person.lastName;
};
var user = new Student("Jane", "M.", "User");
typeof window !== 'undefined' && (document.body.innerHTML = greeter(user)); // 浏览器环境才这样执行
// 一、基础类型
var a1 = true;
var a2 = '字符串';
var a3 = 12;
// 数组
var a4 = [1, 2, 3]; // 方式一
var list = [1, 2, 3]; // 方式二
var a5 = ['1', '2'];
var a6 = ['1', '2', 3, 4]; // 混合数组
var a6 = ['1', '2', 3, 4]; // 混合数组
// 元组 Tuple:  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
var myTuple;
myTuple = ['abc', 3];
// myTuple[2] = 111 --> 错误，定义元组时长度固定了
// 元组
var tom = ['sss', 4]; // 元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
tom.push('dddd'); // 添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var mc = Color.Green;
var mcName = Color[2]; // 注意，这里取的是名称，string类型
console.log(mc, mcName);
// bject表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
var aObj = {};
aObj.a = 1;
aObj.b = '2222';
// 类型断言：重写类型   eg: a = ro as number[];？
// 函数参数定义类型
var myFn = function (_a) {
    var a = _a.a, b = _a.b;
    console.log(a, b, 555);
};
myFn({ a: 123, b: '2' });
var myFn2 = function (aobj) {
    console.log(aobj.a, aobj.b, 555);
};
myFn2({ a: 1, b: '2' });
var myPont = { label: 'abc', x: 5 };
var mySearch;
mySearch = function (arg1, arg2) {
    var result = arg1.search(arg2);
    return result > -1;
};
mySearch('abcdef', 'bcd');
var afn = function (arg1, arg2, grg3) {
    if (arg2 === void 0) { arg2 = 2; }
    console.log(arg1, arg2, grg3);
};
afn(1);
var defineObj = {
    name: '张三',
    sayName: function () {
        var _this = this;
        setTimeout(function () {
            console.log('settimeout延迟测试this指向', _this.name);
        });
    }
};
typeof defineObj.sayName === 'function' && defineObj.sayName();
var a = {
    name: '111',
    url: 'www.baidu.com'
};
console.log(a);
var addd = {};
var obj = {
    create: function (attrs) {
    }
};
var persons = [];
var addPerson = function (user) {
    persons.push(user);
    return true;
};
// 将obj2的合并到obj1中
var fn = function (obj1, obj2) {
    var copyObj = JSON.parse(JSON.stringify(obj1));
    for (var x in obj2) {
        copyObj[x] = obj2[x];
    }
    return copyObj;
};
fn({ a: '1', b: '2' }, { b: '333', c: '444' });
var Ab = /** @class */ (function () {
    function Ab() {
    }
    return Ab;
}());
var Abc = /** @class */ (function () {
    function Abc() {
    }
    return Abc;
}());
function isFish(animal) {
    // 强制类型转换 - <类型>值
    // if (typeof (<Fish>animal).swim === 'function') {
    //     return true;
    // }
    // 强制类型转换 - 值 as 类型 - 推荐使用as，因为泛型也是用<>
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
// 强制类型转换 end-----------
// ECMAScript 的内置对象
var b = new Boolean(1);
var e = new Error('Error occurred');
var d = new Date();
var r = /[a-z]/;
// DOM 和 BOM 的内置对象
if (typeof window !== 'undefined') {
    var body = document.body;
    var allDiv = document.querySelectorAll('div');
    document.addEventListener('click', function (e) {
        // Do something
    });
}
