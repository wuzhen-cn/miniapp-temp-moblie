# Dgov-miniApp-template
## 当前版本
&emsp;&emsp;v0.0.1
## 简介
&emsp;&emsp;基于vue.js,搭配使用[element-ui](https://element.eleme.cn/#/zh-CN/component/installation) UI组件库，风格统一，设计考究，并且更多功能在不停开发中。
## 模板结构
```shell
├── public 存放模板（index.html）及外部公共资源(如jquery.js)
└── src 源代码文件目录
     ├── assets                 静态资源文件
     │    └── logo.png
     ├── components             全局组件
     │    └── HelloWorld.vue
     ├── config                 配置文件及常量定义
     │    └── const.js
     ├── netServices            封装的网络请求组件
     │    └── netService.js
     ├── router                 路由
     │    ├── index.js            路由控制
     │    └── router.js           具体路由定义
     ├── store                  全局变量
     │    ├── module.js           全局变量下的某个模块
     │    └── index.js            入口文件（包含模块）
     ├── util                   封装的工具类
     │    └── util.js             常用工具方法
     ├── view                   视图文件
     │    └── home.vuejs          具体视图
     ├── App.vue                app入口（dom容器）
     └── main.js                js入口文件（加载组件及绑定dom）
```
## 项目启动
### 安装依赖
```
npm install    //or cnpm install
```
### 启动开发模式：编译、热加载
```
npm run serve
```
### 生产模式：编译、压缩
```
npm run build
```
### 个性化设置
参照 [vue-cli 设置手册](https://cli.vuejs.org/config/).


## 许可
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, inspur