## ruby 安装
[安装指南](https://www.ruby-lang.org/zh_cn/documentation/installation/#building-from-source)

## Rails 安装
[安装指南](https://ruby-china.github.io/rails-guides/getting_started.html)

## Ubuntu linux下安装sqlite3
```js
sudo apt-get install sqlite3
sqlite3 -version
// 图形界面
sudo apt-get install sqlitebrowser
// 启动
sqlitebrowser
```
## rails new blog 抛错 An error occurred while installing sqlite3 (1.4.1), and Bundler cannot continue
```sudo apt-get install libsqlite3-dev```

## 启动 Web 服务器
```bin/rails server```

## 创建控制器和视图

可以用控制器生成器来创建控制器。下面的命令告诉控制器生成器创建一个包含“index”动作的“Welcome”控制器：
```bin/rails generate controller Welcome index```

## 设置应用主页
**配置路由**
```config/routes.rb```

默认welcome/index为入口
```root 'welcome#index'```