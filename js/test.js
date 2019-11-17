console.log((function test() {
    console.log("Hello!");
}).toString());

var data = [7, 8, 9];
console.log("0" in data);
console.log(1 in data);
console.log(3 in data);

console.log(new Boolean(false) instanceof Boolean);