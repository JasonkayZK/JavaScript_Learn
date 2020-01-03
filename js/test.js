console.log((function test() {
    console.log("Hello!");
}).toString());

let data = [7, 8, 9];
console.log("0" in data);
console.log(1 in data);
console.log(3 in data);

console.log(Boolean(false) instanceof Boolean);

a = {
    "param1": 1,
    "param2": "2",
    "param3": /param3/
};

for (let param in a) {
    console.log(`${param}, ${a[param]}`);
}

function finallyTest() {
    try {
        for (let i = 0; i < 5; ++i) {
            if (i === 4) return;
            if (i <= 3) {
                console.log(i);
            } else {
                throw new Error("Runtime Error!");
            }
            return;
        }
    } catch(e) {
        console.log(e.message);
    } finally {
        console.log("Though return, finally can be done!");
    }
}

finallyTest();

console.log({}.prototype);

let test1 = Object.create(Object.prototype);
console.log("toString" in test1);
let test2 = Object.create(null);
console.log("toString" in test2);



let p = {x: 1};
let o = Object.create(p);
console.log(p.isPrototypeOf(o));
console.log(Object.prototype.isPrototypeOf(o));


let arr1 = [undefined,undefined];
let arr2 = new Array(3);
console.log(0 in arr1);
console.log(0 in arr2);


(function() {console.log("闭包!");})();


a = [1,2,3];
delete a[1];
console.log(1 in a);
console.log(a.length);

console.log(1 == true);
console.log(1 === true);


data = [1,2,3,4,5];
data.forEach(function (v, i, a) {
    a[i] = v + 1;
});
console.log(data);

// 7.9.2 map
a = [1,2,3];
let b = a.map(function (value, index, array) {
    return value * value;
});
console.log(b);


// 7.9.3 filter
a = [5,4,3,2,1];
console.log(a.filter(function (x) {
    return x < 3;
}));


// 类数组对象
var a = {};
var i = 0;
while (i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;
console.log(a);


// 类数组对象使用Array数组方法
var a = {
    "0": "a",
    "1": "b",
    "2": "c",
    length: 3
};
console.log(Array.prototype.join.call(a, "+"));
console.log(Array.prototype.slice.call(a, 0));
console.log(Array.prototype.map.call(a, function (x) {
    return x.toUpperCase();
}));


// this关键字
o = {
    m: function () {
        var self = this;
        console.log(this === o);
        f();

        function f() {
            console.log(this === o); // 这个this是全局变量, 在use strict模式下是undefined!
            console.log(self === o);
        }
    }
};

o.m();



// 可选形参
function getPropertyNames(o, /* optional */ a) {
    a = a || [];
    for (let property in o) {
        a.push(property);
    }
    return a;
}

console.log(getPropertyNames(o));
console.log(getPropertyNames(o, []));



// 可变长实参列表
function f(x, y, z) {
    if (arguments.length !== 3) {
        throw new Error("3 args is required!");
    }
}


function max(/* ... */) {
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < arguments.length; i++) {
        max = max > arguments[i] ? max : arguments[i];
    }
    return max;
}

console.log(max(1,2,3,3,3,111,1234,123,555,123412));


// 实参对象, ECMAScript 5中移除了特性!
function f1(x) {
    console.log(x);
    console.log(arguments[0]);
    arguments[0] = 2;
    console.log(x);
}

f1(1);





// 闭包作用域
var scope = "global scope";
function checkscope1() {
    var scope = "localscope";
    function innerScope() {
        return scope;
    }
    return innerScope();
}
console.log(checkscope1());

var scope = "global scope";
function checkscope2() {
    var scope = "localscope";
    function innerScope() {
        return scope;
    }
    return innerScope;
}
console.log(checkscope2()());



// 利用闭包实现的私有属性存取器方法
function addPrivateProperty(o, name, predicate) {
    var value;

    o["get" + name] = function () {
        return value;
    };

    o["set" + name] = function (v) {
        if (predicate && !predicate(v)) {
            throw new Error("set" + name + ": invalid value " + v);
        }
        value = v;
    };
}

o = {};
addPrivateProperty(o, "Name", function (x) {
    return typeof x == "string";
});
o.setName("Jack");
console.log(o.getName());
// o.setName(0);


function constfunc1(v) {
    return function () {
        return v;
    }
}
var funcs = [];
for (var j = 0; j < 10; j++) {
    funcs[j] = constfunc1(j);
}
console.log(funcs[5]());


function constfuncs() {
    var funcs = [];
    for (var i = 0; i < 10; i++) {
        funcs[i] = function () {
            return i;
        };
    }
    return funcs;
}
var funcs = constfuncs();
console.log(funcs[5]()); // 10



// 方法的length(arguments.callee.length)属性
function check(args) {
    var actual = args.length;
    var expected = args.callee.length;
    if (actual !== expected) {
        throw new Error("Expected " + expected + "args; got " + actual);
    }
}

function f(x, y, z) {
    check(arguments);
    return x + y + z;
}

console.log(f(1,2,3));


// call()
date = new Date;
console.log(date.toString());
console.log(Object.prototype.toString.call(date));


// apply()
function trace(o, m) {
    var original = o[m];
    o[m] = function () {
        console.log(new Date(), "Entering: " + m);
        var result = original.apply(this, arguments);
        console.log(new Date(), "Leaving: " + m);
        return result;
    }
}

o = {
    "m": function () {
        return 1;
    }
};
console.log(o.m());
trace(o, "m");
console.log(o.m());



// bind
function f(y) {
    return this.x + y;
}
o = {x: 1};
g = f.bind(o);
console.log(g(2));


var sum = function (x, y) {
    return x + y;
};
var succ = sum.bind(null, 1);
console.log(succ(2));



// toString()
console.log(Date.toString());




