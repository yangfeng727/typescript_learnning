var afn = function (arg) {
    console.log('函数接口测试', arg);
};
afn('123');
// type和interface的区别
// 在ts中，定义类型有两种方式：接口（interface）和类型别名（type alias）
// interface只能定义对象类型，type声明的方式可以定义组合类型，交叉类型(&连接)和原始类型
// 如果用type alias 声明的方式，会导致一些功能的缺失
// 1.interface方式可以实现接口的extends/implements，而type 不行
// 2.interface可以实现接口的merge，但是type不行
/*
组合类型：|
let a: string | number;

交叉类型： &
interface A {
  name: string;
  sex: number;
}

interface B {
  age: number;
  sex: number;
}

type C = A&B
let c:C = { name: 'xxx', age: 18, sex: 1 }

原始类型：number,string,boolean,元组,数组,any,enum枚举,null,undefined,never,void
let a:number=1
*/
// 一、Mixins
// 官方的混合-需要手写函数来实现需要混合类中的方法
// Disposable Mixin
var Disposable = /** @class */ (function () {
    function Disposable() {
    }
    Disposable.prototype.dispose = function () {
        this.isDisposed = true;
    };
    return Disposable;
}());
// Activatable Mixin
var Activatable = /** @class */ (function () {
    function Activatable() {
    }
    Activatable.prototype.activate = function () {
        this.isActive = true;
    };
    Activatable.prototype.deactivate = function () {
        this.isActive = false;
    };
    return Activatable;
}());
// 注意：这里类 implements 类，ts中才有的特殊用法，没使用extends而是使用implements。 把类当成了接口，仅使用Disposable和Activatable的类型而非其实现
// 可以这样理解 接口 extends 接口，ts中 接口可以 extends 类（其实是类的类型，实例有的都有，换句话说就是不包括构造函数、静态属性或静态方法）
// 那么 这里的 类 implements 类（其实是类的类型）
var SmartObject = /** @class */ (function () {
    function SmartObject() {
        var _this = this;
        // Disposable
        this.isDisposed = false;
        // Activatable
        this.isActive = false;
        setTimeout(function () { return console.log(_this.isActive + " : " + _this.isDisposed); }, 2000);
    }
    SmartObject.prototype.interact = function () {
        this.activate();
    };
    return SmartObject;
}());
applyMixins(SmartObject, [Disposable, Activatable]);
var smartObj = new SmartObject();
setTimeout(function () { return smartObj.interact(); }, 1000);
////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
function mfx(num) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    var arr = arg;
    arr.push(num);
    return arr;
}
// let myFn:Ifn<number> = mfx // 可选
// myFn(111,2,3)
console.log(mfx(1, 2, 333), 6666);
// 内置对象 Boolean、Error、Date、RegExp、Document、HTMLElement、Event、NodeList ...
var dom = document.getElementById('ddd');
var a = 1;
a = 'abc';
var aFn = 'click';
function add(dom, event) {
}
add(document.getElementById('ddd'), 'click');
// add(document.getElementById('ddd'),'dbclick') -- 会报错，
// declare enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }
var Directions;
(function (Directions) {
    Directions[Directions["Up"] = 0] = "Up";
    Directions[Directions["Down"] = 1] = "Down";
    Directions[Directions["Left"] = 2] = "Left";
    Directions[Directions["Right"] = 3] = "Right";
})(Directions || (Directions = {}));
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
console.log(directions, 7777);
// let interface_tFn22:configFn2<string>= (val1:string):string=>{
//     return val1
// }
var myGetVal = function (val) {
    return val;
};
console.log('定义函数泛型接口另外一种方式', myGetVal('dd'));
// type aaa = keyof Iperson
// let abc:aaa = {age:1}
// function my(a: keyof Iperson){
//     console.log(a)
// }
// my({name:1})
// function abssss<T extends keyof Iperson>(val:T):void{
// }
// abssss({name:'1'})
/*
 keyof的用法，这里约束 “key这个变量是obj这个类型所具有的”
 当前方法，定义一个根据对象属性查找对象值的方法，这样写是为了约束传入的key必须在obj中
*/
function getKey(obj, key) {
    return obj[key];
}
getKey({ name: '张三', age: 12 }, 'name');
var a123 = 'location';
var test = 'name';
var lilei = function (man) {
    console.log(man.age);
    console.log(man.height);
    console.log(man.sex);
};
lilei({ age: 18, height: 180, sex: 'male' });
