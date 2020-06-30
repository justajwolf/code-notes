import 'reflect-metadata';
import {Exclude, Expose, plainToClass} from 'class-transformer';

class User {
    @Expose() id: number;
    @Expose() name: string;
    @Expose() age: number;
    desc: string;
}

const userDemo = {
    name: 'jack',
    age: 24,
    desc: 'cbhcbhcbh'
}

const user = plainToClass(User, userDemo, {excludeExtraneousValues: true});
console.log(user);
