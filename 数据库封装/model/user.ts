// 与User表映射的类

import {MysqlDb} from '../modules/db'
class UserClass{ // 与User表映射的类
    username:string | undefined; // 定义联合类型将undefined加上，不报错
    password:string | number | undefined; // 定义联合类型将undefined加上，不报错
}

const UserModel = new MysqlDb<UserClass>() // 约束为UserClass

export {
    UserClass,
    UserModel
}