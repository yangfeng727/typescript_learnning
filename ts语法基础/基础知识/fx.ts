//泛型接口 + 泛型类
interface List<T> {
    add(ele: T): void;
    get(index: number): T;
    size(): number;
  }
  
  class ArrayList<T> implements List<T> {
    public array: Array<T>;
    public index: number = 0;
    constructor() {
      this.array = [];
    }
    public add(ele: T) {
      this.array[this.index++] = ele;
    }
    size() {
      return this.index ? this.index : 0;
    }
    get(index: number): T {
      return this.array[index];
    }
  }
  
  // 定义继承类（多态）
  abstract class People {
    public name!: string;
    public abstract info(): void;
    public eat() {
      console.log("人类-吃饭");
    }
  }
  
  class Man extends People {
    public info() {
      console.log("男人");
    }
  }
  class Woman extends People {
    public info() {
      console.log("女人");
    }
  }
  
  // 结合使用
  class Tcs {
    //泛型约束
    public rent<T extends object>(list: List<T>) {
      for (let i = 0; i < list.size(); i++) {
        let res = list.get(i);
        console.log("get拿到的类型是：", res);
        //虽然传入前和get拿到的类型是一样的，外部可以点操作，这里不行。
        //是因为谁知道你传入的泛型类是否一定有info()函数，所以需as断言后才能使用点
        //或者泛型约束为People类型
        (res as any).info(); //用了any自然不能点操作
      }
    }
  }
  
  //let aList: List<String> = new ArrayList<String>();
  //泛型约束是为了防止，如上句，泛型为String则会影响Tcs类的内部代码使用
  let aList: List<People> = new ArrayList<People>();
  //上句：左边是List接口，右边是ArratList接口。同样是多态，接口的多态
  let bus: People = new Woman(); //类的多态
  console.log("传入前的类型是：", bus);
  aList.add(bus);
  aList.add(new Man()); //类的多态
  
  let tc = new Tcs();
  tc.rent(aList);
  export {};