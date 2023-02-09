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


class Student {
    fullName: string;

    // 在构造函数的参数上使用public等同于创建了同名的成员变量，如：this.firstName,this.middleInitial,this.lastName
    constructor(public firstName: any, public middleInitial: any, public lastName: any) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

let greeter = (person: Person) => {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

typeof window !== 'undefined' && (document.body.innerHTML = greeter(user)); // 浏览器环境才这样执行

// 一、基础类型

var a1: boolean = true
var a2: string = '字符串'
var a3: number = 12
// 数组
var a4: number[] = [1, 2, 3] // 方式一
var list: Array<number> = [1, 2, 3]; // 方式二
var a5: string[] = ['1', '2']
var a6: (string | number)[] = ['1', '2', 3, 4] // 混合数组
var a6: Array<string | number> = ['1', '2', 3, 4] // 混合数组
// 元组 Tuple:  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
var myTuple: [string, number];
myTuple = ['abc', 3]
// myTuple[2] = 111 --> 错误，定义元组时长度固定了
// 元组
let tom: [string, number] = ['sss',4] // 元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
tom.push('dddd') // 添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型

// 枚举
enum Color { Red = 1, Green, Blue }
var mc: number = Color.Green
var mcName: string = Color[2] // 注意，这里取的是名称，string类型
console.log(mc, mcName)
// bject表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
var aObj: any = {}
aObj.a = 1
aObj.b = '2222'

// 类型断言：重写类型   eg: a = ro as number[];？

// 函数参数定义类型
let myFn = function ({ a, b }: { a: number, b: string }): void {
    console.log(a, b, 555)
}
myFn({ a: 123, b: '2' })

let myFn2 = function (aobj: { a: number, b: string }): void {
    console.log(aobj.a, aobj.b, 555)
}
myFn2({ a: 1, b: '2' })


// 接口 interface
// 作用1：约束对象形状 -- 对象必须和定义的接口保持一致
// 作用2：结合类实现
interface Point {
    label: string;
    col?: string; // 可选属性
    readonly x: number; // 只读属性,属性只能在对象刚刚创建的时候修改其值
    [propName: string]: any; // 动态的其他属性都可以 - 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
}

let myPont: Point = { label: 'abc', x: 5 }
// myPont.x = 33333 // error

// 函数接口
interface SearchFunc {
    (source: string, subString: string): boolean; // （参数）:函数返回值类型
}
let mySearch: SearchFunc = function (arg1, arg2) { // 函数的参数名不需要与接口里定义的名字相匹配
    let result = arg1.search(arg2);
    return result > -1;
}
mySearch('abcdef', 'bcd')


var afn = function (arg1: number, arg2: number = 2, grg3?: number) { // 不能给可选参数设置默认值，即arg2?:number=2 写法错误
    console.log(arg1, arg2, grg3)
}
afn(1)


// ts定义对象，需要先定义接口
interface myObj {
    name: string,
    [propName: string]: string | Function
    // sayName?:Function
}
let defineObj: myObj = {
    name: '张三',
    sayName() {
        setTimeout(() => {
            console.log('settimeout延迟测试this指向', this.name)
        })
    }
}
typeof defineObj.sayName === 'function' && defineObj.sayName()


// 使用&符号合并多个对象属性 - 交叉类型，结果必须是&结合后的类型
type options = {name:string} & {url:string}

let a:options = {
    name:'111',
    url:'www.baidu.com'
}

console.log(a)



// Partial 将每个属性都变为可选，Omit 排除某个属性
type user = {
    id:number,
    name:string,
    age:number
}

type T=(Partial<Omit<user,'id'>>)

let addd:T={
}

let obj={
    create(attrs:(Partial<Omit<user,'id'>>)&{id:number}){

    }
}


// 练习ts语法

interface IUser{
    age:number;
    name:string;
}

interface IfAddPerson<T extends Object>{ // 函数式泛型接口，参数是对象
    (arg:T):boolean;
}

let persons = []
let addPerson:IfAddPerson<IUser> = function(user){
    persons.push(user)
    return true
}


interface Iobj{
    [index:string]:any // 声明了一个对象接口，属性string，值any类型
}
// 将obj2的合并到obj1中
let fn = function(obj1:Iobj,obj2:Iobj){
    let copyObj = JSON.parse(JSON.stringify(obj1))
    for(let x in obj2){
        copyObj[x] = obj2[x]
    }
    return copyObj
}


fn({a:'1',b:'2'},{b:'333',c:'444'})


class Ab{
    name!:string;
}
class Abc{
    age!:string;
}

// ts和java一样，同时只能继承一个类
// class cChild extends Ab,Abc{ // 报错

// }

// 类可以实现多个接口
// class cChild implements IUser,Point{

// }


// 强制类型转换 start-----------
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    // 强制类型转换 - <类型>值
    // if (typeof (<Fish>animal).swim === 'function') {
    //     return true;
    // }
    // 强制类型转换 - 值 as 类型 - 推荐使用as，因为泛型也是用<>
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
// 强制类型转换 end-----------

// ECMAScript 的内置对象
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

// DOM 和 BOM 的内置对象
if(typeof window !== 'undefined'){
    let body: HTMLElement = document.body;
    let allDiv: NodeList = document.querySelectorAll('div');
    document.addEventListener('click', function(e: MouseEvent) {
      // Do something
    });
}


// 非空断言 -- 
const fnFK = (arg: string | null | undefined) => {
    let a: string = arg!
    console.log(a, 333)
}