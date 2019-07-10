```js
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
```
## 查看进程
```sudo netstat -tanlp```

## 查看端口是否被占用
```netstat -nap | grep 80```

```tcp 0.0.0.0：80的tcp号为2683```
## 杀死进程
```sudo kill 2683```

## SSH(远程连接工具)
1. SSH是安全的加密协议，用于远程连接Linux服务器                
2. SSH的默认端口是22，安全协议版本是SSH2                
3. SSH服务器端主要包含2个服务功能SSH连接和SFTP服务器                
4. SSH客户端包含ssh连接命令和远程拷贝scp命令等
```ssh root@192.168.25.137```
## scp
**用于在Linux下进行远程拷贝文件的命令**
```scp user@192.168.244.210:/home/user/uro/* ~/```

## 开启微信开发者工具
```
~/Downloads/wechat_web_devtools
 ./bin/wxdt
```

## 开启mogodb
```
~/Downloads/robo3t-1.2.1-linux-x86_64-3e50a65/bin
 ./robo3t
```

## mongodb 常用命令
```js
docker exec -it omnisocials-mongodb bash
mongo admin --port 27017 -u admin -p Abc123__

show dbs
show tables
use portal-master
db.helpDesk.find().pretty() 
// 更新isActivated字段为true
db.helpDesk.update({}, {"$set":{"isActivated":true}})
use portal-tenants-shared
// 查找assignee是string类型的数据，并更新为objectId类型
db.issue.find({"assignee": {$type: 2}}).forEach(function(data) {db.issue.update({"_id": data._id}, {$set: {"assignee": ObjectId(data.assignee)}})})
```


## 超出显示滚动条
```js
overflow-x: scroll;
white-space: nowrap;
margin-bottom: 0.26rem;

&::-webkit-scrollbar {
display: none;
}
```

```使用cookie进行缓存数据(setCookie, getCookie, delCookie)```


```angularjs 添加dom节点,就是添加model(复制model,就类似于添加dom操作)```

Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。
Vue中的nextTick涉及到Vue中DOM的异步更新
在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。

## VSCode 批量替换快捷键 ctrl + F2

## cropperjs裁剪图片
``setAspectRatio 选择尺寸``
``cropper.getCroppedCanvas().toDataURL('image/jpeg') 转换成base64``
## 上传裁剪后的图片
```在osimageupload组件里传needCrop(是否裁剪)以及裁剪比率aspectRatio```

**if data.length > 0 可以简写为 if data.length**

restService.get(config.resources.groupOauthUrl, params).then (resp) ->
  resp.data

## Ctrl + H
```Ctrl + H: 切换隐藏文件（夹）显示或者不显示```

## Ubuntu 文件夹
- etc     存放系统配置文件
- tmp     存放临时文件
- var     存放邮件、系统日志等变化文件
## 在Ubuntu 16.04上使用Nginx安装PHP 7.1
https://www.rosehosting.com/blog/install-php-7-1-with-nginx-on-an-ubuntu-16-04-vps/
## php.ini文件位置
/etc/php/7.1/cli/php.ini

## 编辑nginx配置
sudo nano /etc/nginx/sites-available/example.com

## 启动nginx
sudo systemctl restart nginx

netstat -nlp |grep 80   ```查看所有80端口使用情况·```
## 启动mysql
sudo systemctl mysql start

## git connfig
```
git config --global user.name 'liulu' && git config --global user.email '850481135@qq.com'
git config user.name
git config user.email
cd ~/.ssh/
sudo gedit config
```
### 关闭运行中的容器
docker stop 容器ID
### 启动一个已经停止的容器
docker start 容器ID
### 重启一个容器
docker restart 容器ID

### 显示当前运行的容器
docker ps
### 显示全部容器
docker ps -a

### 查看本地镜像
docker images

### 删除容器
docker rm 容器ID

### 删除所有容器
docker rm $(docker ps -a)
### 查看历史
docker history 镜像ID

docker start 50a0004b6d6c
docker start 981e843cdbc6

docker run --name postgres1 -e POSTGRES_PASSWORD=password -p 54321:5432 -d postgres:10
172.17.0.1 postgres  password 54321

docker inspect postgres:9.4 
 **进入数据库**
docker exec -it 981e843cdbc6 /bin/bash

docker pull chorss/docker-pgadmin4
docker run -p 5050:5050  -e "PGADMIN_DEFAULT_EMAIL=test@boluome.com"  -e "PGADMIN_DEFAULT_PASSWORD=test"  -d chorss/docker-pgadmin4

cd /etc/nginx/
sudo cp sites-available/default sites-available/uro
sudo ln -s /etc/nginx/sites-available/uro sites-enabled/uro

sudo systemctl restart nginx

命令行导入dump
psql -h 172.17.0.1 -p 54321  -U postgres pcfollow_development < pcf_pro.ustest.20190119

### 安装PostgreSQL客户端
sudo apt-get install postgresql-client

### 安装PostgreSQL服务器
sudo apt-get install postgresql

### 模糊匹配
ctrl+r 

### history
history 查看历史
history|grep a 查看历史

### 环境初始化
```js
rails db:setup
bin/rails db:migrate 
RAILS_ENV=development
```
### Redis 服务端配置——Could not connect to Redis at 127.0.0.1:6379: Connection refused
```js
redis-cli
sudo apt install redis-tools

redis-server /etc/redis.conf
sudo apt install redis-server

redis-cli
// 127.0.0.1:6379> 
// successfully
```

**rvm**
```js
source /usr/share/rvm/scripts/rvm
// 切换ruby版本
rvm install 2.5.2

bundle install

bin/rails server
```

bin/webpack-dev-server