# React on Rails
## 安装
[安装指南](https://shakacode.gitbooks.io/react-on-rails/content/docs/tutorial.html)
**前提条件:**yarn,node和ruby on rails必须已经安装好
```js
gem install rails
gem install foreman
gem install webpacker

bundle exec rails webpacker:install
bundle exec rails webpacker:install:react

// 在Gemfile文件中添加
gem 'webpacker'
gem 'react_on_rails', '11.2.1'

// 运行bundle并提交git存储库
bundle

git add -A
git commit -m 'Initial commit'

// 在Rails上安装React之前,需要首先在运行生成器之前git提交您的文件，否则它将生成错误
rails generate react_on_rails:install
bundle && yarn

// 然后使用静态客户端文件运行服务器
foreman start -f Procfile.dev

// 使用webpack-dev-server运行
foreman start -f Procfile.dev-server

// 访问http://localhost:3000/hello_world并查看运行的React On Rails
```