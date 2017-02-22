export function area(radius){
    return Math.PI * radius * radius;
}

export function circumference(radius){
    return 2 * Math.PI * radius;
}

var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year as newYear};
