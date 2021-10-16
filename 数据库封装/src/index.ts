import { UserClass, UserModel } from '../model/user'
import { ArticalClass, ArticalModel } from '../model/artical'

// ------ user 相关 ------
let userOne = new UserClass()
userOne.username = '张三'
userOne.password = '123123'

UserModel.add(userOne) // 数据库新增
let result = UserModel.get(12) // 调用数据查询
console.log('数据库查询user表', result)

//  ------  artical 相关  ------
let articalOne = new ArticalClass({
    title:'百度新闻',
    desc:'artical描述'
})

ArticalModel.add(articalOne) // 数据库新增
let result2 = ArticalModel.get(13) // 调用数据查询
console.log('数据库get查询artical表', result2)