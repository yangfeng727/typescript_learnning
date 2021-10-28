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
    // java中的不一样,java直接走参数类型对于的方法
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

## 确定分配断言:ts2.7+版本不初始化会报错 “初始化表达式，且未在构造函数中明确赋值”
```typescript

// 解决方案：声明的时候使用!
class myClass<T>{
    // 在声明一个变量之后必须用！给他进行赋值操作。
    defaultName!: T; // 不用!会报错，ts2.7+版本都需要对属性进行 ”确定分配断言“
    add!:(x: T, y: T)=>T
}
```
