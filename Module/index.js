
import { area, circumference, firstName, lastName, newYear} from './circle';
import { foo } from './time.js'
import * as all from './all.js'
import double,{square} from './default.js'
import {newArea} from './inheritFromCircle.js'
import * as imf from './total-part.js'

// import { 'f' + 'oo' } from './time.js' 报错
// 因为在编译时执行

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));

console.log(firstName);
console.log(lastName);
console.log(newYear);

console.log(foo);
setTimeout(() => console.log(foo), 1200);

all.one();
all.two();

double(8);
square(12);

console.log(newArea(100));

console.log([...imf.users]);
console.log(Object.keys(imf.db));