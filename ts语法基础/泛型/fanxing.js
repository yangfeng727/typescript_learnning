"use strict";
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
function getinfo(name, age) {
    if (typeof name === 'string') {
        return "\u6211\u662F\uFF1A" + name + " \u5E74\u9F84\u662F\uFF1A" + age;
    }
    else {
        return "\u6211\u662F\uFF1A" + name;
    }
}
// ts中的类
var person = /** @class */ (function () {
    function person(n) {
        this.name = n;
    }
    person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8"; // 当前类中调用属性
    };
    return person;
}());
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(n) {
        return _super.call(this, n) || this;
    }
    Web.prototype.work = function () {
        return this.name + "\u5728\u5DE5\u4F5C"; // 子类中使用父类的属性-若name为private将不可调用
    };
    return Web;
}(person));
var c_persion = new Web('张三');
console.log(c_persion.run());
console.log(c_persion.work());
// 
/*
类的概念---ts语法和其他面向对象语法，如java等通用概念

类的修饰符：
public:公有               在当前类里面，子类，类外部（指的以实例化的对象方式调用）都可以访问
protected:受保护类型      在当前类里面，子类可以访问，类外部（指的以实例化的对象方式调用）不可以访问
private:私有类型          在当前类里面可以访问，子类，类外部（指的以实例化的对象方式调用）都不可以访问
不加属性修饰符，默认pubilc

static：
静态属性或者方法 static: 注意在静态方法中，不能调用public等修饰符定义的属性，若需要调用，需要将属性改为static

多态：
多态：父类定义一个方法不去实现，让继承他的子类去实现（重写），每一个子类有不同的表现
多态也是继承的一种表现

抽象类：
ts中的抽象类：它是提供其他类继承的基类，不能直接实例化
用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体的实现并且必须在派生类中实现
abstract只能放在抽象类里面
抽象类和抽象方法用来定义标准

*/
// 抽象类 eg:
console.log('---- 抽象类 start ----');
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        return this.name + "\u5728\u5954\u8DD1";
    };
    return Animal;
}());
var dog = /** @class */ (function (_super) {
    __extends(dog, _super);
    function dog(name) {
        return _super.call(this, name) || this;
    }
    dog.prototype.eat = function () {
        return this.name + "\u7231\u5403\u9AA8\u5934";
    };
    return dog;
}(Animal));
var cat = /** @class */ (function (_super) {
    __extends(cat, _super);
    function cat(name) {
        return _super.call(this, name) || this;
    }
    cat.prototype.eat = function () {
        return this.name + "\u7231\u5403\u9C7C";
    };
    return cat;
}(Animal));
var d = new dog('小狗');
console.log(d.eat());
console.log(d.run());
var c = new dog('小猫');
console.log(c.eat());
console.log(c.run());
console.log('---- 抽象类 end ----');
var arr = ['111', '2222'];
console.log('数组约束-可索引接口（不常用）', arr[0]);
var uobj = { name: '1', age: '2' };
console.log('对象约束-可索引接口（不常用）', uobj['name']);
var iDog = /** @class */ (function () {
    function iDog(n) {
        this.name = n;
    }
    iDog.prototype.eat = function () {
        console.log('类类型接口:使用implements实现', this.name + '爱吃骨头');
    };
    return iDog;
}());
var idog = new iDog('小狗');
idog.eat();
var programmer = /** @class */ (function () {
    function programmer(n) {
        this.name = n;
    }
    programmer.prototype.coding = function (code) {
        if (code === void 0) { code = 'typescript'; }
        console.log(this.name + '会写' + code);
    };
    return programmer;
}());
var iweb = /** @class */ (function (_super) {
    __extends(iweb, _super);
    function iweb(n) {
        return _super.call(this, n) || this;
    }
    iweb.prototype.eat = function () {
        console.log(this.name + '吃饭');
    };
    iweb.prototype.work = function () {
        console.log(this.name + '敲代码');
    };
    return iweb;
}(programmer));
var cp = new iweb('张三');
console.log('-------接口扩展，接口可以继承接口 start------');
cp.eat();
cp.work();
cp.coding(); // 父类的方法
console.log('-------接口扩展，接口可以继承接口 end------');
// ts中的泛型
/*
泛型，通俗的理解，泛型就是解决 类 接口 方法的复用性，以及对不特定数据类型的支持
可以支持不特定的数据类型，要求传入的类型和返回的类型和定义的一致，具有约束性
*/
// 1.泛型函数
function tFn(value) {
    return value;
}
tFn(1);
tFn('11');
// 2.泛型类
var tClass = /** @class */ (function () {
    function tClass() {
        this.list = [];
    }
    // constructor() { }
    tClass.prototype.add = function (val) {
        this.list.push(val);
    };
    tClass.prototype.min = function () {
        var minVal = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (minVal > this.list[i]) {
                minVal = this.list[i];
            }
        }
        return minVal;
    };
    return tClass;
}());
var ut1 = new tClass();
ut1.add(10);
ut1.add(9);
ut1.add(11);
console.log('泛型类使用：number', ut1.min());
var ut2 = new tClass();
ut2.add('b');
ut2.add('a');
ut2.add('c');
console.log('泛型类使用：number', ut2.min());
var interface_tFn = function (val1, val2) {
    return val1 + val2;
};
console.log('定义函数泛型接口', interface_tFn('a', 'b'));
console.log('定义函数泛型接口', interface_tFn(1, 2));
// let interface_tFn22:configFn2<string>= (val1:string):string=>{
//     return val1
// }
function getVal(val) {
    return val;
}
var myGetVal = getVal;
console.log('定义函数泛型接口另外一种方式', myGetVal('dd'));
// 4.泛型-把 “类作为参数类型” 的泛型类,去除重复代码 --- 重要
// ------ 重要例子：操作数据库的泛型类 start ------
// 需求：操作数据库user表和artical表，分别新增一条数据
// 1.定义一个操作数据库的通用泛型类，不定义泛型的话每次都得定义一个这样的类，代码重复
var myDataBase = /** @class */ (function () {
    function myDataBase() {
    }
    myDataBase.prototype.add = function (info) {
        console.log("%c[*test*] " + '重要例子：把 “类作为参数类型” 的泛型类:', "color: red;font-size:13px", info);
        // 这里省略对数据库操作的方法
        // ...
        // ...
        return true; // 新增后返回一个状态，成功或失败
    };
    return myDataBase;
}());
// 2.定义一个与数据库表结构进行映射的类
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Artical = /** @class */ (function () {
    function Artical(param) {
        this.title = param.title;
        this.desc = param.desc;
        this.status = param.status;
    }
    return Artical;
}());
// 3.插入user
var u = new User();
u.username = '张三';
u.password = '123123';
var db1 = new myDataBase();
db1.add(u);
// 4.插入Artical
var a = new Artical({
    title: '国内新闻',
    desc: '国内新闻描述'
});
var db2 = new myDataBase();
db2.add(a);
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
        throw new Error("Method not implemented.");
    };
    return MysqlDb;
}());
var UserTable = /** @class */ (function () {
    function UserTable() {
    }
    return UserTable;
}());
var uu = new UserTable();
uu.username = '李四';
uu.password = '123333';
var oMysqlDb = new MysqlDb();
oMysqlDb.add(uu);
// 类似定义Mssql数据库类
var Mssql = /** @class */ (function () {
    function Mssql() {
        // 和数据库建立连接在这里实现
        // ...
        // ..
    }
    Mssql.prototype.add = function (info) {
        console.log("%c[*test*] " + '重要例子：类型、接口、类 、泛型 综合使用:', "color: red;font-size:13px", info);
        return true;
    };
    Mssql.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    Mssql.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    Mssql.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return Mssql;
}());
// 下面使用方式同上
