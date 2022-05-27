// 模块类库  module-lib.js
// const version = "1.0.0";
// function doSomething() {
//    console.log('moduleLib do something');
// }
// function moduleLib(options) {
//    console.log(options);
// }
// moduleLib.version = version;
// moduleLib.doSomething = doSomething;
// module.exports = moduleLib;


let name = '张三'
let age = 12
let sex = '男'
// export default{ // 需要babel编译了才能在node中运行
//     name,
//     age,
//     sex 
// }

module.exports = { // 需要将es6语法 export default 改为commonjs导出 才能在node环境直接运行
    name,
    age,
    sex
};



