
/*
    装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上
    通俗讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能
    常见装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器
    装饰器是过去几年js最大成就之一，已是Es7的标准特性之一

    装饰器写法：普通装饰器（无法传参），装饰器工厂（可传参）
*/


/*
 1.类装饰器
*/
console.log('---------- 1.类装饰器---------')
// 1.1 普通装饰器（无法传参）
function logClass(params: any) {
    console.log(params)
    params.prototype.apiUrl = 'http://localhost:8080/'
}

@logClass
class httpClass {
    constructor() { }
}

let a: any = new httpClass()
console.log(a.apiUrl)

// 1.2 装饰器工厂（可传参）

function logClass2(params: string) {
    return function (target: any) {
        console.log(params) // hello // 这是传入装饰器的参数
        console.log(target) // ƒ httpClass2() {}  这个是装载装饰器的类

        target.prototype.apiUrl = 'abc'
    }
}

@logClass2('hello')
class httpClass2 {
    constructor() { }
}

let b: any = new httpClass2()
console.log(b.apiUrl)


// 1.3 使用装饰器更改类里面的构造函数、属性、方法

function dFn(target: any) {

    return class extends target { // 固定写法
        name!: string; // 这里必须要把之前类的属性都列出来
        name2: string = '这是新增的属性';
        constructor(n: string){
            super(n);
        }

        say(): void {
            console.log(this.name + ' say from derector', this.name2) // log: 张三 say from derector 这是新增的属性
        }
    }
}

@dFn
class mClass {
    name: string;
    constructor(n: string) {
        this.name = n
    }

    say(): void {
        console.log(this.name + 'say hello')
    }
}

let ddd = new mClass('张三')
ddd.say()


/*
 2.属性装饰器
   属性装饰器表达式会在运行时当作函数被调用，传入下列两个参数：
   1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   2.成员的名字
*/
console.log('---------- 2.属性装饰器---------')

function propertyDre(param: string) {
    return function (target: any, attr: any) {
        console.log(target) // 类的原型对象
        console.log(attr) // 类的成员属性

        target[attr] = param // 更改值
    }
}

class dre {

    @propertyDre('张三')
    name: string | undefined

    constructor() { }

    getData(): void {
        console.log('属性装饰器，在装饰器中修改属性的值：', this.name)
    }

}

let os = new dre()
os.getData()


/*
 3.方法装饰器
   它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
   方法装饰器会在运行时传入下列3个参数：
   1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   2.成员的名字
   3.成员的属性描述符
*/
console.log('---------- 3.方法装饰器---------')

function httpDirector(param: any) {
    return function (target: any, methodName: any, descriptor: any) {
        console.log(target) // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
        console.log(methodName) // 成员的名字
        console.log(descriptor) // 成员的属性描述符 descriptor.value 是方法的具体内容

        // --1--可扩展类的属性
        target.name = '张三'

        // --2--可扩展类的方法
        target.run = function () {
            console.log('run')
        }

        // --3--下面 "修改" 传过来的方法,将参数全部转为string后再传给原来的方法
        let oldMethod = descriptor.value
        descriptor.value = function (...args: any[]) {

            console.log(this, args, '这是装饰器里面的内容')
            let vals = args.map(item => {
                return String(item)
            })

            // 修改参数后再执行原来的逻辑
            oldMethod.apply(this, args) // 必须更改this指向
        }

    }
}

class httpClient {

    mine = 'ddddd' // 内部公有属性

    constructor() { }

    @httpDirector('http:www.baidu.com')
    getData(...args: any[]) {
        console.log(this.mine)
        console.log(args, '这是getData里的内容')
    }
}

let ou: any = new httpClient()

// 扩展内容
console.log(ou.name)
ou.run()

// 修改方法
ou.getData(123, 'ssss')



/*
4.方法参数装饰器 --- 这个不常用
   参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下列3个参数：
   1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   2.参数的名字。
   3.参数在函数参数列表中的索引。
*/
console.log('---------- 4.方法参数装饰器---------')

function gg(param: any) {
    return function (target: any, methodName: any, index: any) {
        console.log(param)
        console.log(target)
        console.log(methodName)
        console.log(index) // 参数在函数参数列表中的索引
    }
}

class ggClass {

    constructor() { }

    getData(@gg('参数一') arg: any, @gg('参数二') arg2: any): void {
        console.log('getData里面的内容', arg, arg2)
    }
}

let ag = new ggClass()
ag.getData(12, '啦啦啦')


/*
5.装饰器执行顺序
 // 属性 > 方法 > 方法参数 > 类
 // 如果有多个同样的装饰器，它会先执行后面的
*/
