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

