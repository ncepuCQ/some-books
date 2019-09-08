# JavaScript 设计模式 BY 张容铭

## 第一篇

### 第一章
```js
  // javaScript 中分为 函数对象 和 普通对象
  // 普通对象 __proto__ 为 { constructor: '对应的构造函数', __proto__: '具体分析' }
  // 函数对象 __proto__ 与上面一致
  // 函数对象 prototype { constructor: 'itself', __proto__: '具体分析' }
  // Function.prototype 为函数对象，但不具有 prototype 属性
  const instance = '对象实例';
  const construct = '构造函数';
  instance.__proto__ == construct.prototype; // true
  // 极端例子
  // 1. Function.prototype 为函数对象
  /* 2. */Function.prototype.__proto__ == Object.prototype; // true
  /* 3. */Object.prototype.__proto__ == null; // true
```
### 第二章 | 继承
* instanceof 的工作原理
```js
    son instanceof father
    son.__proto__ || son.__proto__.__proto__ /* || ... */ == father.prototype
```
* 继承的完善方案
```js
  // 继承的简单方法
  var father = new superClass();
  father.constructor = subClass;
  subClass.prototype = father;
  // 寄生组合式继承 | 圣杯模式
  // 单纯看最终结果 var son = new subClass();
  // son.__proto__ == subClass.prototype == f;
  // son.__proto__.__proto__ == f.__proto__ ==  F.prototype == superClass.prototype
  // f 只包含 constructor 的空对象
  var superClass, subClass;
  var F = function () {};
  F.prototype = superClass.prototype;
  var f = new F();
  f.constructor = subClass;
  subClass.prototype = p;
```
* 手写深度克隆
```js
  function deepClone (obj) {
      const isArray = Array.isArray(obj); // Object.prototype.toString.call(param);
      const newObj = isArray ? [] : {};
      Object.keys(obj).map(item => {      // for (var item in obj) 也可以兼容 数组 和 对象
          newObj[item] = typeof obj[item] === 'object' ? deepClone(obj[item]) : obj[item]; 
      });
      return newObj;
  }
```
## 第二篇

### 第三章 | 简单工厂模式
* 两种例子
```js
  // 两种例子中每次新增均两处修改
  function BMW (type, name) {
    this.type = type;
    this.name = name;
  }
  function Benz (type, name) {
    this.type = type;
    this.name = name;
  }
  function firstOne (type, name) {
    switch(type) {
      case 'BMW':
        return new BMW(type, name);
      case 'Benz':
        return new Benz(type, name);
    }
  }
  // 分割线
  function secondOne (type, name) {
    var o = Object.create();
    o.type = type;
    o.name = name;
    if (type == 'BMW') {
      // 差异化代码
    } else if (type == 'BMW') {
      // 差异化代码
    }
    return o;
  }
```
### 第四章 | 工厂方法模式
```js
  // 添加新内容 只需增添原型上的类即可, 即一次修改
  function Factory (type, name) {
    if (this instanceof Factory) {
      var s = new this[type](name);
      s.type = type;
      return s;
    } else {
      return new Factory(type, name);
    }
  }
  Factory.prototype = {
    BMW (name) {
      this.name = name;
    },
    Benz (name) {
      this.name = name;
    }
  }
```
### 第五章 | 抽象工厂模式
```js
  // 类似于工厂方法模式，只是在原型上添加几个只会报错的方法代表抽象接口
  function VehicleFactory (subType, superType) {
    if (typeof VehicleFactory[superType] === 'function') {
      var F = function () {}
      F.prototype = new VehicleFactory[superType](); // 继承父类中的相关属性
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
    getPrice () {
      return new Error('抽象方法不能调用');
    },
    getSpeed () {
      return new Error('抽象方法不能调用');
    }
  }
```
### 建造者模式
```js
  // 建造者模式关注过程
  function Human (param) {
    this.skill = param && param.skill || '保密';
  }
  Human.prototype.getSkill = function () {
    return this.skill;
  }
  function Name (name) {
    this.name = name;
  }
  function Person (name) {
    var _person = new Human;
    _person.name = new Name(name);
    return _person;
  }
```
