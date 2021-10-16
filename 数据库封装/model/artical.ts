// 与Artical表映射的类

import {MysqlDb} from '../modules/db'

class ArticalClass{ // 与Artical表映射的类 - 方式二，可以实例化的时候传参
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

const ArticalModel = new MysqlDb<ArticalClass>() // 约束为UserClass

export {
    ArticalClass,
    ArticalModel
}