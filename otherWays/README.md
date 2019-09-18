# 其他途径

## 位图 和 矢量图
```
  位图：图片原本具有分辨率，若放大至分辨率之上，系统即猜像素点及其颜色的渲染位置。
  矢量图：类似于一连串的数学公式，有线和多边形组成，因此放大缩小不失真且所占体积不变。
  位图存在意义：显示精细，因为目前显示屏都是由像素点组成的。
```

## 模块间作用域互相独立
```js
  // 每个模块(文件)作用域互相独立，但全局变量唯一，例如 global， window 等
  // a.js
  function Play () {
      this.init = 0;
      this.a = function () {
          let player = this;
          player.b();
      };
      this.b = function () {
          player.init = 1;
      }
  }
  module.exports = Play;
  // b.js
  const Play = require('./src/main.js');
  const player = new Play();
  // global.player = player; // 加上此句不会报错
  player.a();
  console.log(player);
  // ReferenceError: player is not defined
```

## 使用dom函数时一定要注意各个浏览器的兼容 | scrollLeft
```js
  // canvas api: ctx = canvas.getContext('2d'), ctx.setLineDash()
  const necessary = 'https://caniuse.com/'
  // 获取当前元素的具体样式 兼容性最广的是 element.getBoundingClientRect() ==> { left, top, right, bottom }
```
* 使用 多行文本溢出 时会出现元素高度减少2px，因此最好添加固定宽度
```
  span {
    overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  }
```