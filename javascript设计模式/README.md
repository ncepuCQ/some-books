# JavaScript 设计模式 BY 张容铭

# 第一篇

## 第一章
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
  Function.prototype.__proto__ == Object.prototype; // true
  Object.prototype.__proto__ == null; // true
```
## 第二章 | 继承
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