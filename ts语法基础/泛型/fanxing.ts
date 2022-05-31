// 重载
// ts中的函数重载-同样的函数传入不同的参数执行不同的功能---感觉没啥用，ts的函数重载比较鸡肋，最终函数逻辑的实现还是在一个函数体内去判断它的参数类型，然后做相应的操作
// java中的不一样,java直接走参数类型对于的方法
function getinfo(name: string): string;
function getinfo(name: string, age: number): string;
function getinfo(name: any, age?: any): any {
    if (typeof age === 'number') {
        return `我是：${name} 年龄是：${age}`
    } else {
        return `我是：${name}`
    }
}
getinfo('abc')
getinfo('abc',123)


// ts中的类
class person {
    name: string;
    constructor(n: string) {
        this.name = n
    }
    run() {
        return `${this.name}在运动` // 当前类中调用属性
    }
}


class Web extends person {
    constructor(n: string) {
        super(n)
    }
    run() {
        return `${this.name} ----在运动` // 当前类中调用属性
    }
    work() {
        return `${this.name}在工作` // 子类中使用父类的属性-若name为private将不可调用
    }
}

let c_persion:Web = new Web('张三')
console.log(c_persion.run())
console.log(c_persion.work())

/*
java多态
多态的形式：具体类多态、抽象类多态、接口多态
多态的前提和体现
1.有继承/实现关系
2.有方法重写
3.有父类引用指向子类对象
总结：编译看左边，运行看右边。和直接new 父类的区别在于使用的是子类重写后的方法
*/
let cc2:person = new Web('张三2')
console.log(cc2.run())
// console.log(cc2.work()) // error: 类型“person”上不存在属性“work”


  // 定义父类
  class Parent{
    name:string;
    colors:Array<string>;
    static proArr:Array<number> = [1,2,3] // 要多个子类实例共享部分数据可以使用 static
    constructor(){
        this.name = "parent";
        this.colors = ["red", "blue", "yellow"];
    }

    sayFather():void{
        console.log("来自父类的呐喊")
    }
}

// 定义子类
class Child extends Parent { // 继承父类且扩展
    type:string;
    constructor(){
        super();
        this.type = "child"; // 扩展父类属性
    }

    sayChild():void {
        console.log("来自子类的呐喊")
    }
}
// 调用：
let c1 = new Child()
let c2 = new Child()
c1.name = '更改值类型属性'
c1.colors.push('green')
Parent.proArr.push(999)
console.log('Parent.proArr:',Parent.proArr)
// console.log('不知道父类的时候可根据原型链找父类:',c2.__proto__.__proto__.constructor.proArr)

console.log('---c1:', c1,'---c1.name:',c1.name,'---c1.colors:',c1.colors)
console.log('---c2:', c2,'---c2.name:',c2.name,'---c2.colors:',c2.colors)

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
console.log('---- 抽象类 start ----')
abstract class Animal {

    public name: string;
    constructor(name: string) {
        this.name = name
    }
    abstract eat(): void; // 定义抽象类，在派生类中必须要实现该方法
    run() {
        return `${this.name}在奔跑`
    }
}

class dog extends Animal {
    constructor(name: string) {
        super(name)
    }
    eat() {
        return `${this.name}爱吃骨头`
    }
}

class cat extends Animal {
    constructor(name: string) {
        super(name)
    }
    eat() {
        return `${this.name}爱吃鱼`
    }
}


let d = new dog('小狗')
console.log(d.eat())
console.log(d.run())
let c = new dog('小猫')
console.log(c.eat())
console.log(c.run())

console.log('---- 抽象类 end ----')


// interface:接口

// 1.数组约束-可索引接口（不常用）
interface useArr {
    [index: number]: string; // 定义一个数组规则，里面都是string类型
}
var arr: useArr = ['111', '2222']
console.log('数组约束-可索引接口（不常用）', arr[0])

// 2.对象约束-可索引接口（不常用）
interface useObj {
    [index: string]: string; // 定义一个对象规则，里面都是string类型，不能定义为数组，因为数组索引是数字
}
var uobj: useObj = { name: '1', age: '2' }
console.log('对象约束-可索引接口（不常用）', uobj['name'])

// 定义函数接口
interface SomeInterface {
    (arg1: string, arg2: string): boolean;
}
let someFunc: SomeInterface = function (arg1: string, arg2: string) {
    const res = arg1.search(arg2)
    return res > -1;
}
console.log(someFunc('weast', 'east'));


// 3.类类型接口-和抽象类类似-(重点：常用)
interface AnimalInterface {
    name: string;
    eat(): void;
}

class iDog implements AnimalInterface { // 使用implements关键字去是“实现”AnimalInterface接口，和继承（使用extends）不一样
    public name: string;
    constructor(n: string) {
        this.name = n
    }

    eat() {
        console.log('类类型接口:使用implements实现', this.name + '爱吃骨头')
    }
}
let idog = new iDog('小狗')
idog.eat()

// 4.接口扩展，接口可以继承接口
interface aiAnimal {
    eat(): void;
}

interface iperson extends aiAnimal { // 接口继承接口
    name: string;
    work(): void;
}


class programmer { // 稍微复杂点再加个父类
    name: string;
    constructor(n: string) {
        this.name = n
    }
    coding(code: string = 'typescript') { // 定义默认参数
        console.log(this.name + '会写' + code)
    }
}


class iweb extends programmer implements iperson { // 子类继承父类 且 类实现接口的定义
    constructor(n: string) {
        super(n)
    }
    eat() {
        console.log(this.name + '吃饭')
    }
    work() {
        console.log(this.name + '敲代码')
    }
}
let cp = new iweb('张三')
console.log('-------接口扩展，接口可以继承接口 start------')
cp.eat()
cp.work()
cp.coding() // 父类的方法
console.log('-------接口扩展，接口可以继承接口 end------')


// ts中的泛型
/*
泛型，通俗的理解，泛型就是解决 类 接口 方法的复用性，以及对不特定数据类型的支持
可以支持不特定的数据类型，要求传入的类型和返回的类型和定义的一致，具有约束性
*/

// 1.泛型函数,这里设置了泛型默认值为string
function tFn<T=string>(value: T): T {
    return value
}
tFn(1)
tFn('11')

// 2.泛型类
class tClass<T>{
    public list: T[] = []
    // constructor() { }

    add(val: T): void {
        this.list.push(val)
    }

    min(): T {
        let minVal:T = this.list[0]
        for (let i = 0; i < this.list.length; i++) {
            if (minVal > this.list[i]) {
                minVal = this.list[i]
            }
        }
        return minVal
    }
}

let ut1 = new tClass<number>()
ut1.add(10)
ut1.add(9)
ut1.add(11)
console.log('泛型类使用：number',ut1.min())

let ut2 = new tClass<string>()
ut2.add('b')
ut2.add('a')
ut2.add('c')
console.log('泛型类使用：number',ut2.min())


// 3.泛型接口
// 3.1定义函数泛型接口
interface configFn{
    <T>(val1:T,val2:T):T;
}

let interface_tFn:configFn = <T>(val1:T,val2:T):T=>{
    return val1 as any + val2
}

console.log('定义函数泛型接口',interface_tFn('a','b'))
console.log('定义函数泛型接口',interface_tFn(1,2))

// 3.2定义函数泛型接口另外一种方式,进一步，我们可以把泛型参数提前到接口名上
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

// 4.泛型-把 “类作为参数类型” 的泛型类,去除重复代码 --- 重要

// ------ 重要例子：操作数据库的泛型类 start ------
// 需求：操作数据库user表和artical表，分别新增一条数据

 // 1.定义一个操作数据库的通用泛型类，不定义泛型的话每次都得定义一个这样的类，代码重复
class myDataBase<T>{
    add(info:T):boolean{ // 操作表的新增数据，【这里传入的info，是用下面定义的数据库表映射类进行约束，表面调用数据库新增方法时只能是这个类型】

        console.log("%c[*test*] "+'重要例子：把 “类作为参数类型” 的泛型类:',"color: red;font-size:13px",info)
        // 这里省略对数据库操作的方法
        // ...
        // ...
        return true // 新增后返回一个状态，成功或失败
    }
}

// 2.定义一个与数据库表结构进行映射的类
class User{ // 与User表映射的类
    username:string | undefined; // 定义联合类型将undefined加上，不报错
    password:string | number | undefined; // 定义联合类型将undefined加上，不报错
}

class Artical{ // 与Artical表映射的类 - 方式二，可以实例化的时候传参
    title:string | undefined; // 定义联合类型将undefined加上，不报错
    desc:string | undefined; // 定义联合类型将undefined加上，不报错
    status:boolean | undefined; // 定义联合类型将undefined加上，不报错

    constructor(param:{
        title:string | undefined; // 定义联合类型将undefined加上，不报错
        desc:string | undefined; // 定义联合类型将undefined加上，不报错
        status?:boolean | undefined; // 定义联合类型将undefined加上，不报错
    }){
        this.title = param.title
        this.desc = param.desc
        this.status = param.status
    }
}

// 3.插入user

var u = new User() 
u.username = '张三'
u.password = '123123'

let db1 = new myDataBase<User>()
db1.add(u)


// 4.插入Artical
var a = new Artical({ // 实例化的时候传参
    title: '国内新闻',
    desc:'国内新闻描述'
})
let db2 = new myDataBase<Artical>()
db2.add(a)



// ------ 重要例子：操作数据库的泛型类 end ------


// 5.TypeScript 类型、接口、类 、泛型 综合使用--TypeScript封装统一操作Mysql Mongodb Mssql的底层类库
/*
功能：定义一个操作数据库的库 支持 Mysql MongoDB Mssql
需求1：Mysql MongoDB Mssql 功能一样 都有 add update delete get方法
注意：约束统一的规范，以及代码重用

解决方案：需要约束规范所以要定义接口，需要代码重用所以用到泛型

   1.接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范

   2.泛型 通俗理解：泛型就是解决 类 接口 方法的复用性

*/

interface DBI<T>{
    add(info:T):boolean;
    update(info:T,id:number):boolean;
    delete(id:number):boolean;
    get(id:number):any[];
}

// 定义一个操作 Mysql 数据库的类 注意：要实现泛型接口 这个类也应该是一个泛型类
class MysqlDb<T> implements DBI<T>{

    constructor(){
        // 和数据库建立连接在这里实现
        // ...
        // ..
    }

    add(info: T): boolean {
        console.log("%c[*test*] "+'重要例子：类型、接口、类 、泛型 综合使用:',"color: red;font-size:13px",info)
        return true
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.");
    }

}

class UserTable{ // 与User表映射的类
    username:string | undefined; // 定义联合类型将undefined加上，不报错
    password:string | number | undefined; // 定义联合类型将undefined加上，不报错
}

let uu = new UserTable()
uu.username = '李四'
uu.password = '123333'

let oMysqlDb = new MysqlDb<UserTable>()
oMysqlDb.add(uu)


// 类似定义Mssql数据库类
class Mssql<T> implements DBI<T>{

    constructor(){
        // 和数据库建立连接在这里实现
        // ...
        // ..
    }
    add(info: T): boolean {
        console.log("%c[*test*] "+'重要例子：类型、接口、类 、泛型 综合使用:',"color: red;font-size:13px",info)
        return true
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.");
    }

}

// 下面使用方式同上

// 6.1泛型约束
interface IhasLength{ // 约束了必须有length属性
  length:number
}
function fxLength<T extends IhasLength>(val:T):number{ // 定义了一个泛型函数必须有length属性
    return val.length
}
fxLength([1,2,3])

// 6.2多个类型参数之间也可以互相约束：T extends U表示T要有U的结构
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
// 上例中，我们使用了两个类型参数，其中要求 T 继承 U，注意：T extends U意思是T包含U 这样就保证了 U 上不会出现 T 中不存在的字段。