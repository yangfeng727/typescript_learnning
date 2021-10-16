// ts支持命名空间，主要是解决命名冲突
// 模块化：提取公共功能，主要是解决代码重用
export namespace A {
    interface animal{
        eat():void;
    }

    export class dog implements animal{ // 使用命名空间内部的成员需要export
        constructor(public name:string){
            this.name = name
        }

        eat(){
            console.log(this.name+'吃骨头')
        }
        
    }

    export class cat implements animal{
        constructor(public name:string){
            this.name = name
        }

        eat(){
            console.log(this.name+'吃鱼')
        }
        
    }
}

export namespace B {
    interface animal{
        eat():void;
    }

    export class dog implements animal{ // 使用命名空间内部的成员需要export
        constructor(public name:string){
            this.name = name
        }

        eat(){
            console.log(this.name+'吃骨头')
        }
        
    }

    export class cat implements animal{
        constructor(public name:string){
            this.name = name
        }

        eat(){
            console.log(this.name+'吃鱼')
        }
        
    }
}