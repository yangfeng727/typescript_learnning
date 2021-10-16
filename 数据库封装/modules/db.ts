/*
功能：定义一个操作数据库的库 支持 Mysql MongoDB Mssql
需求1：Mysql MongoDB Mssql 功能一样 都有 add update delete get方法
注意：约束统一的规范，以及代码重用

解决方案：需要约束规范所以要定义接口，需要代码重用所以用到泛型

   1.接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范

   2.泛型 通俗理解：泛型就是解决 类 接口 方法的复用性

*/

interface DBI<T>{ // 定义泛型接口，规范所有数据库的统一标准
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
        // throw new Error("Method not implemented.");

        // 这里实现在数据库查询数据并返回一个数组
        // ...
        // ..
        // 这里简单测试，直接返回
        let list = [{
            title:'数据title',
            desc:'这是返回的描述描述'
        }]

        return list
    }

}

// msSql类似
class MssqlDb<T> implements DBI<T>{

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

// 其他数据库如mongoDB实现
// ...
// ..

// ts 中可以暴露类
export {
    MysqlDb,
    MssqlDb
}