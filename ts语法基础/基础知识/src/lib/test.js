
var name = '张三';
var age = 12;
var sex = '男';
var myFN=function(arg){
    console.log('自定义声明文件：', arg)
}
// export default {
//     name,
//     age,
//     sex,
//     myFN
// };
module.exports ={
    name,
    age,
    sex,
    myFN
};
