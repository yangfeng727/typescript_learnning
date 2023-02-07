interface myfn{
    (name:string):void;
}

let afn:myfn = (arg):void=>{
console.log('函数接口测试',arg)
}
afn('123')

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
class Disposable {
    isDisposed!: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive!: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

// 注意：这里类 implements 类，ts中才有的特殊用法，没使用extends而是使用implements。 把类当成了接口，仅使用Disposable和Activatable的类型而非其实现
// 可以这样理解 接口 extends 接口，ts中 接口可以 extends 类（其实是类的类型，实例有的都有，换句话说就是不包括构造函数、静态属性或静态方法）
// 那么 这里的 类 implements 类（其实是类的类型）
class SmartObject implements Disposable, Activatable {
    constructor() {
        setTimeout(() => console.log(this.isActive + " : " + this.isDisposed), 2000);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose!: () => void;
    // Activatable
    isActive: boolean = false;
    activate!: () => void;
    deactivate!: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}


interface Ifn<T>{
    (a:T,b?:T):T[];
}

function mfx<T>(num:T,...arg:T[]):T[]{
    let arr:T[] = arg
    arr.push(num)
    return arr
}

// let myFn:Ifn<number> = mfx // 可选
// myFn(111,2,3)

console.log(mfx<number>(1,2,333), 6666)

// 内置对象 Boolean、Error、Date、RegExp、Document、HTMLElement、Event、NodeList ...
let dom:HTMLElement|null = document.getElementById('ddd')


// ---- type用法，type定义的不能extends和implements ---- 

// 1-1类型别名
type myType = number | string
let a:myType = 1
a='abc'

// 1-2字符串字面量类型
type myTypeFn = 'click' | 'scroll'
let aFn = 'click'
function add(dom:HTMLElement|null,event:myTypeFn){

}

add(document.getElementById('ddd'),'click')
// add(document.getElementById('ddd'),'dbclick') -- 会报错，

// declare enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }
enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

console.log(directions, 7777)

interface configFn2<T>{
    (val1:T):T;
}

// let interface_tFn22:configFn2<string>= (val1:string):string=>{
//     return val1
// }

var myGetVal:configFn2<String> = <T>(val:T):T=>{
    return val
}

console.log('定义函数泛型接口另外一种方式',myGetVal('dd'))


interface Iperson{
    name:string;
    age:number;
    location:string;
}

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
function getKey<T extends Object,K extends keyof T>(obj:T,key:K): T[K]{
    return obj[key]
}
getKey({name:'张三',age:12},'name')

type ac = keyof Iperson // name | age | location
let a123:ac = 'location'



interface Izip {name: '', age: 12, class: 1}
type ant = keyof Izip // ant=name | age | calss

let test:ant = 'name'

interface People {
    age:number,
    height:number
  }
  interface Man{
    sex: string
  }
  const lilei = (man: People & Man) => { // 具有所有成员
    console.log(man.age)
    console.log(man.height)
    console.log(man.sex)
  }
  lilei({age: 18,height: 180,sex: 'male'});
