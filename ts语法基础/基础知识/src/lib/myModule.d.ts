// 靠，es6导出直接使用这个就行了，妈蛋，还用declare、module、namespace个毛线


// declare function moduleLib(options: Options): void;
// interface Options {
//    [key: string]: any,
// }
// declare namespace moduleLib{
//    const version: string;
//    function doSomething(): void;
// }
// export = moduleLib; // 这样写兼容性更好


// 方式一：commonjs的方式
// declare namespace moduleLib{
//    let name:any;
//    let age:any;
//    let sex:any;
// }
// export = moduleLib; // 这样写兼容性更好

// 方式二：es6方式声明，官方推荐
export default{
    name,
    age,
    sex
 }