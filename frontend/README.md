## nrm
nrm 是一个 npm 源管理器

查看npm源地址
```npm config list```
### 安装
```npm install nrm -g --save```
### 使用
- 用nrm ls命令查看默认配置，带*号即为当前使用的配置
```nrm ls```
```
npm ---- https://registry.npmjs.org/
cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
nj ----- https://registry.nodejitsu.com/
rednpm - http://registry.mirror.cqupt.edu.cn/
npmMirror  https://skimdb.npmjs.com/registry/
edunpm - http://registry.enpmjs.org/
  ```
- 查看当前使用的是哪个源
```nrm current```
- 切换源
```nrm use cnpm```
- 增加源
```nrm add 别名  url```
- 删除源
```nrm del  别名```
- 测试速度
```nrm test 别名```

## 安装React Devtools调试工具

安装React Devtools调试工具的步骤：
1. 去git上下载react-devtools文件到本地，https://github.com/facebook/react-devtools
2. 用npm安装依赖
```
cd ~/Downloads/react-devtools-3
npm install
```
3. 安装依赖成功后，打包一份扩展程序
```npm run build:extension:chrome```
**打包完成之后，```~/Downloads/react-devtools-3/shells/chrome```文件夹中多了一个```build/```文件夹**
4. 打开chrome扩展程序chrome://extensions/,加载已解压的扩展程序，选择第3步中的生成的```build/unpacked```文件夹

# 前端基础知识整理

## 盒模型
1. 标准盒模型: ```box-sizing: content-box;```width = content的宽度
2. IE盒模型: ```box-sizing: border-box;```width = border + padding + content的宽度

## BFC
**块级格式化上下文**