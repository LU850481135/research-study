# Haml
[官网](http://haml.info/docs/yardoc/file.REFERENCE.html#using_haml)

它是一个命令行工具。需要先安装Ruby语言，再安装Haml
```gem install haml```

Haml可以通过三种方式使用:
- 从命令行运行Haml,将haml文件一次性转为html文件
```haml input.haml output.html```
- 作为Ruby on Rails的插件
  在Gemfile文件中添加
  ```gem "haml"```
- 作为独立的Ruby模块

**haml的简化规则如下**
1. !!! 5 代表 <!DOCTYPE html>
2. %E 代表HTML标签。
3. %E#id 代表id属性。
4. %E.class 代表class属性。
5. %E(attr="xxx") 代表某一个特定属性。
6. %E XXX 代表插入标签的内容。
7. %E %N 代表N是E的子元素。N如果写在第二行，需要缩进。

在Haml中，”/ “起首的行表示HTML注释，”-# “起首的行表示Haml注释