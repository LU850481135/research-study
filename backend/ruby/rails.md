# Rails
Rails 是使用 Ruby 语言编写的 Web 应用开发框架

## 启动 Web 服务器
```
$ cd blog
$ bin/rails server
```

## 命令行创建控制器和视图
```bin/rails generate controller Welcome index```

控制器位于
```app/controllers/welcome_controller.rb```
视图位于
```app/views/welcome/index.html.erb```

## 设置应用主页
**config/routes.rb**
```js
Rails.application.routes.draw do
  get 'welcome/index'
  // 定义资源
  resources :articles
  // 根路径的访问请求应该发往 welcome 控制器的 index 动作
  root 'welcome#index'
end
```

## Rails 路由

执行 ```bin/rails routes```命令，可以看到所有标准 REST 动作都具有对应的路由

| HTTP 方法 | 路径 | 控制器#动作 | 具名辅助方法  |
|:--------:| -------------:|--------:| -------------:|
| GET | /admin/articles | admin/articles#index | admin_articles_path
| GET | /admin/articles/new | admin/articles#new | new_admin_article_path
| POST | /admin/articles | admin/articles#create | admin_articles_path
| GET | /admin/articles/:id | admin/articles#show | admin_article_path(:id)
| GET | /admin/articles/:id/edit | admin/articles#edit | edit_admin_article_path(:id)
| PATCH/PUT | /admin/articles/:id | admin/articles#update | admin_article_path(:id)
| DELETE | /admin/articles/:id | admin/articles#destroy | admin_article_path(:id)

## 创建模型
```bin/rails generate model Article title:string text:text```
创建字段,并将这两个属性会自动添加到数据库的 articles 表中，并映射到 Article 模型上
并在 db/migrate 文件夹中生成数据库迁移文件
```迁移```是用于简化创建和修改数据库表操作的 Ruby 类
```bin/rails db:migrate```Rails 会执行迁移命令并告诉我们它创建了 Articles 表