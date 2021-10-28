// --
type PersonSM ={
    name:string;
    age:Number;
}
type StudentSM = {
    study:()=>void;
}
type Teacher<T> = T extends PersonSM?Animal:PersonSM

// --
declare let MyPoint: { x: number; y: number; }; // 定义一个对象

// interface SomePoint { x: number; y: number; }
// declare var MyPoint: SomePoint;


// declare const name: string;
// declare function getName(): string;
// declare class Animal {
//     constructor(name: string);
//     sayHi(): string;
// }
// declare enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }
// interface Options {
//     data: any;
// }

// export { name, getName, Animal, Directions, Options };