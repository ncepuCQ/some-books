// 深度克隆
function deepClone(obj) {
    const isArray = Array.isArray(obj); // Object.prototype.toString.call(param);
    const newObj = isArray ? [] : {};
    Object.keys(obj).map(item => {
        newObj[item] = typeof obj[item] === 'object' ? deepClone(obj[item]) : obj[item];
    });
    return newObj;
}
// 简单工厂模式
function BMW(type, name) {
    this.type = type;
    this.name = name;
}
function Benz(type, name) {
    this.type = type;
    this.name = name;
}
function firstOne(type, name) {
    switch (type) {
        case 'BMW':
            return new BMW(type, name);
        case 'Benz':
            return new Benz(type, name);
    }
}
// 抽象工厂模式
function VehicleFactory(subType, superType) {
    if (typeof VehicleFactory[superType] === 'function') {
        var F = function () { }
        F.prototype = new VehicleFactory[superType]();
        var f = new F();
        f.constructor = subType;
        subType.prototype = f;
    } else {
        throw new Error('不存在该抽象类');
    }
}
VehicleFactory.Car = function () {
    this.type = 'car';
}
VehicleFactory.Car.prototype = {
    getPrice() {
        return new Error('抽象方法不能调用');
    },
    getSpeed() {
        return new Error('抽象方法不能调用');
    }
}

var BMW = function (price, speed) {
    this.price = price;
    this.speed = speed;
    this.getPrice = () => {
        return this.price;
    }
}
VehicleFactory(BMW, 'Car');
// 建造者模式
function Human(param) {
    this.skill = param && param.skill || '保密';
}
Human.prototype.getSkill = function () {
    return this.skill;
}
function Name(name) {
    this.wholeName = name;
}
function Person(name) {
    var _person = new Human;
    _person.name = new Name(name);
    return _person;
}
console.log(new Person('chenqiang'));