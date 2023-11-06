# [一篇让你完全够用TS(TypeScript)的指南](https://zhuanlan.zhihu.com/p/505175155)

# tsc命令
```
tsc -p tsconfig.json --watch // 监听文件变动并生成js文件，相当于vs的文件运行任务
```
# ts中let和const的区别
let定义的值，类型是值的类型，而const定义的值，类型就是值
``` typescript
let num = 1 // num类型是number
const num = 1 // num 类型是1
```
# [any 和 unknown 区别](https://www.jianshu.com/p/7c5592bc67ae)

# [TypeScript之Object、object、{ }的区别](https://www.jianshu.com/p/8d7cfc4b912c)

# typescript_learnning
``` typescript
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

```

## 几个概念
```typescript
// 1.重载-方法名称相同，参数不同，返回值可以不一样

    // ts中的函数重载-同样的函数传入不同的参数执行不同的功能---感觉没啥用，ts的函数重载比较鸡肋，最终函数逻辑的实现还是在一个函数体内去判断它的参数类型，然后做相应的操作
    // java中的不一样,java直接走参数类型对应的方法
    function getinfo(name: string): string;
    function getinfo(name: string, age: number): string;
    function getinfo(name: any, age?: any): any {
        if (typeof name === 'string') {
            return `我是：${name} 年龄是：${age}`
        } else {
            return `我是：${name}`
        }
    }

// 2.重写-即覆盖
   // 重写是子类对父类的允许访问的方法的实现过程进行重新编写, 返回值和形参都不能改变。即外壳不变，核心重写！
   class animal{
       eat(str:string){
           console.log('这是父类方法',str)
       }
   }

    class person extends animal{
       eat(str:string){ // 子类重写父类方法，【注意：方法名和参数相同】
           console.log('这是子类重写父类方法',str)
       }
   }

// 3.装饰器
   // 通俗讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能
   function logClass(params:any){
    console.log(params)
    params.prototype.apiUrl = 'abc'
   }

    @logClass
    class httpClass {
        constructor(){}
    }

    let a:any = new httpClass()
    console.log(a.apiUrl)

// 4.抽象类
    // ts中的抽象类：它是提供其他类继承的基类，不能直接实例化
    // 使用abstract 定义，强制派生类实现某个方法
    abstract class animal{
        abstract eat():void;
    }

    class dog extends animal{
        eat(){
            console.log('吃骨头')
        }
    }


```

## 泛型使用例子
``` typescript

function test<T ,U>(arg1:T,arg2:U):T & U{ // 交叉类型，将多个类型合并为一个类型
let result = <T & U>{}

for(let id in arg1){
    (<T>result)[id] = (<T>arg1)[id] // 注意给result[id] 赋值时是这样定义的  (<T>result)[id]
}

for(let id in arg2){
    (<U>result)[id] = (<U>arg2)[id]
}

return result
}

let obj = test({a:'1'},{b:'22'})
console.log(obj,5555) // {a:'1',b:'22'}


```

## 联合类型和交叉类型
``` typescript
// 联合类型 |
// 指多个类型的合并类型，任选其一

// 1.1基础类型联合
let a: string | number;
a = 1; //ok 
a= "a"//ok
// 1.2常量类型联合 - 前面的变量冒号后面是类型！
let a:1|'2' = 1
// 1.3对象联合-代表要么有这个，有么有那个，【注意：可以都存在，都在的时候类似&】
let a:{a:'1'}|{b:2} = {a:'1',b:2}

// 交叉类型 &
// 多种类型的集合，联合对象将具有所联合类型的所有成员,结构必须是&起来的，属性不能少【一句话就是全都要有】
interface People {
  age: number,
  height： number
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


// 联合交叉类型，也就是两个一起用 注意：&优先级大于|，同（js && 优先级大于 || ，如1||2&&3结果是1）
let obj:{name:string} & {age:string} | {name:number} & {age:number} 
// 这里相当于 let obj:({name:string} & {age:string}) | ( {name:number} & {age:number} )
obj={
    name:'张三',
    age:'12'
}
obj={
    name:1,
    age:2
}

```

## 确定分配断言:ts2.7+版本不初始化会报错 “初始化表达式，且未在构造函数中明确赋值”
在TS 2.7版本中引入了确定赋值断言，即允许在实例属性和变量声明后面放置一个 ! 号，以告诉TS该属性会被明确赋值。
```typescript

// 解决方案：声明的时候使用!
class myClass<T>{
    // 在声明一个变量之后必须用！给他进行赋值操作。
    defaultName!: T; // 不用!会报错，ts2.7+版本都需要对属性进行 ”确定分配断言“
    add!:(x: T, y: T)=>T
}
```

## 非空断言,在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。
```typescript
const fnFK = (arg: string | null | undefined) => {
    let a: string = arg! // 看这里
    console.log(a, 333)
}

```

## 接口
```typescript
// 接口 interface
// 作用1：约束对象形状 -- 对象必须和定义的接口保持一致
// 作用2：结合类实现
interface Point {
    label: string;
    col?: string; // 可选属性
    readonly x: number; // 只读属性,属性只能在对象刚刚创建的时候修改其值
    [propName: string]: any; // 动态的其他属性都可以 - 【一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集】
}

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean; // （参数）:函数返回值类型
}

// 接口也可以用来描述数组：
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
/*
虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
除非是用来表示类数组
*/
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments; // 比如这个arguments
}
// 但是常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection
function sum() {
    let args: IArguments = arguments;
}


// 函数类型接口
// 同时，可以定义函数和类，加new修饰的事类，不加new的事函数

    interface Props {
        (data: number): number
    }

    const info: Props = (number:number) => number  //可定义函数

    // 定义函数
    class A {
        name:string
        constructor(name: string){
            this.name = name
        }
    }

    interface PropsClass{
        new (name: string): A
    }

    const info1 = (fun: PropsClass, name: string) => new fun(name)

    const res = info1(A, "小杜杜")
    console.log(res.name) // "小杜杜" 

```

## [在 TypeScript 中使用类型守卫的 5 种方式](https://cloud.tencent.com/developer/article/2061124)
比如vue3.0中 isRef()工具函数就可以被用作类型守卫 - 是带有谓词的自定义类型守卫
```typescript
function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
```

## 常用技巧
```typescript
// 1.extends 检验是否拥有其属性
    interface Props {
        length: number
    }

    const calcArray = <T extends Props,>(data:T): number => {
      return data.length // error
    }

    calcArray('12') // ok
    calcArray([1,3]) //ok
    calcArray(2) //error 可以看出calcArray(2)会报错，这是因为number类型并不具备length这个属性

// 2.keyof 可以获取一个对象接口的所有key值,可以检查对象上的键是否存在
    interface Props {
        name: string;
        age: number;
        sex: boolean
    }

    type PropsKey = keyof Props; //包含 name， age， sex

    const res:PropsKey = 'name' // ok
    const res1:PropsKey = 'tel' // error

    // 泛型中的应用
    const getInfo = <T, K extends keyof T>(data: T, key: K): T[K] => {
        return data[key]
    }

    const info = {
        name: '小杜杜',
        age: 7,
        sex: true
    }

    getInfo(info, 'name'); //ok
    getInfo(info, 'tel'); //error

    // 3.索引访问操作符:通过 [] 操作符可进行索引访问,可以访问其中一个属性
    interface Props {
        name: string;
        age: number;
        sex: boolean
    }
    type age = Props['age']

    // 4.in：映射类型, 用来映射遍历枚举类型
    type name = 'name'|'age'|'sex'
    type props = {
        [p in name]:any
    }

    // in 定义对象 
    type ky = string | number
    type objty = {
        // [x: string]: string;
        // [x: number]: string;
        [x in ky]:string; // 这里 in 后面跟的具体类型， [x: string]: string; [x: number]: string;
    }
    let obj3:objty = {
        aa:'xxx',
        1:'xxx',
    }


    // 5.Partial<T> 作用：将所有属性变为可选的 ?
    interface Props {
        name: string,
        age: number
    }

    const info: Props = {
        name: '小杜杜',
        age: 7
    }

    const info1: Partial<Props> = { 
        name: '小杜杜'
    }

    // 6.Required<T> 作用：将所有属性变为必选的，与 Partial相反
    interface Props {
        name: string,
        age: number,
        sex?: boolean
    }

    const info: Props = {
        name: '小杜杜',
        age: 7
    }

    const info1: Required<Props> = { 
        name: '小杜杜',
        age: 7,
        sex: true
    }

    // 7.Readonly<T> 作用：将所有属性都加上 readonly 修饰符来实现。也就是说无法修改
    interface Props {
        name: string
        age: number
    }

    let info: Readonly<Props> = {
        name: '小杜杜',
        age: 7
    }

    info.age = 1 //error read-only 只读属性 - Readonly修饰后，属性无法再次更改，只能使用

    // 8.Record语法：Record<K extends keyof any, T> 将 K 中所有的"属性的值"转化为 T 类型
    interface Props {
        name: string,
        age: number
    }

    type InfoProps = 'JS' | 'TS'

    const Info: Record<InfoProps, Props> = {
        JS: {
            name: '小杜杜',
            age: 7
        },
        TS: {
            name: 'TypeScript',
            age: 11
        }
    }
    // ---- 从上述代码上来看, InfoProps的属性分别包含Props的属性
    // ---- 需要注意的一点是：K extends keyof any其类型可以是:string、number、symbol


    // 9.Pick语法：Record<K extends keyof any, T> 作用：将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。 -- 将指定的属性挑选出来
     interface Props {
        name: string,
        age: number,
        sex: boolean
    }

    type nameProps = Pick<Props, 'name' | 'age'>

    const info: nameProps = {
        name: '小杜杜',
        age: 7
    }

    // 10.ExcludeExclude语法：Exclude<T, U> 作用：将T类型中的U类型剔除。
    // 数字类型
    type numProps = Exclude<1 | 2 | 3, 1 | 2> // 3
    type numProps1 = Exclude<1, 1 | 2> // nerver
    type numProps2 = Exclude<1, 1> // nerver
    type numProps3 = Exclude<1 | 2, 7> // 1 2

    // 字符串类型
    type info = "name" | "age" | "sex"
    type info1 = "name" | "age" 
    type infoProps = Exclude<info, info1> //  "sex"

    // 类型
    type typeProps = Exclude<string | number | (() => void), Function> // string | number

    // 对象
    type obj = { name: 1, sex: true }
    type obj1 = { name: 1 }
    type objProps = Exclude<obj, obj1> // nerver

    // 11.Extra Extra语法：Extra<T, U> 作用：将T 可分配给的类型中提取 U。与 Exclude相反
    type numProps = Extract<1 | 2 | 3, 1 | 2> // 1 | 2

    // 12.Omit 语法：Omit<T, U> 作用：将已经声明的类型进行属性剔除获得新类型 - 将指定的类型忽略掉
    type InfoProps ={
        name: string,
        age:number,
        sex:boolean
    }
    type Props = Omit<InfoProps, "sex">

    // 13.NonNullable  NonNullable<T> 作用：从 T 中排除 null 和 undefined
    type Props = NonNullable<string | number | null | undefined> // string | number

    // 14.ReturnType  语法：ReturnType<T> 作用：用于获取 函数T的返回类型。
    type Props = ReturnType<() => string> // string
    type Props1 = ReturnType<<T extends U, U extends number>() => T>; // number
    type Props2 = ReturnType<any>; // any
    type Props3 = ReturnType<never>; // any

    // 15.ReturnType 语法：ReturnType<T> 作用：用于获取 函数T的返回类型。
    type Props = ReturnType<() => string> // string
    type Props1 = ReturnType<<T extends U, U extends number>() => T>; // number
    type Props2 = ReturnType<any>; // any
    type Props3 = ReturnType<never>; // any
    // ---- 从上述代码上来看， ReturnType可以接受 any 和 never 类型，原因是这两个类型属于顶级类型，包含函数

    // 16.Parameters：Parameters<T> 作用：用于获取 获取函数类型的参数类型
    type Props = Parameters<() => string> // []
    type Props1 = Parameters<(data: string) => void> // [string]
    type Props2 = Parameters<any>; // unknown[]
    type Props3 = Parameters<never>; // never

    // 17.infer 类型推断，原地获取 可以是使用为条件语句，可以用 infer 声明一个类型变量并且对它进行使用
    type ObjType<T> = T extends {name:infer N,age:infer A}?[N,A]:null;
    let obj1:ObjType<{name:string,age:number}> = ['张三',20] // 格式满足则则N为string，A为number，最终格式为  [string, number]
    let obj2:ObjType<number> = null // 不匹配则是定义的null类型
    let obj3:ObjType<{name:'李四',age:18}> = ['李四',18] // 常量类型

    // Omit 与 Pick 相反， Partial 与 Required 相反 ， Exclude 与 Extra 相反


```

# ts中window的类型是Window

# [详解Typescript里的This](https://zhuanlan.zhihu.com/p/104565681)

# [TypeScript Typeof运算符的5个实用技巧详解](https://www.jb51.net/article/265723.htm)