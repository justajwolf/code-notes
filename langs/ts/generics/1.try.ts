/**
 * name: 泛型嵌套使用try-1
 * date: 2023-07-06T07:58:00.998Z
 * statement: 泛型嵌套导致，叶子类型的泛型，需要依赖父类型通过泛型，进行层层透传，这是一个很令人头疼的方式。
 * expect: 当前类型只负责维护本类型需要的泛型类型，不再关心本层哪些类型是泛型，它需要啥子类型，给这些类型一个any的子类型约束
 */

export class Leaf<TId, TValue> {
    id: TId;
    value: TValue;
}

export class Node<TI, TLeafId, TLeafV> {
    id: TI;
    value: Leaf<TLeafId, TLeafV>;
}

export class Root<TI, TV extends Node<unknown, unknown, unknown>> {
    id: TI;
    value: TV;
}

class A {

}

export class Root2<TI, TV extends Node<unknown, unknown, unknown>> {
    id: TI;
    value: TV;
    geta(){
        
    }
}

const root = new Root<number, Node<string, string, string>>();
