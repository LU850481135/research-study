# 零散笔记
```js
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
```

# Linux 常用命令行
## 基本安装以及卸载
### apt-get(apt)的基本使用
```
安装软件 apt-get install xxx
 
卸载软件 apt-get remove xxx
 
卸载并清除配置 apt-get remove --purge xxx
 
更新软件信息数据库 apt-get update
 
进行系统升级 apt-get upgrade
 
搜索软件包 apt-cache search xxx
 
修正（依赖关系）安装：apt-get -f install

```
### dpkg的基本使用
```
安装deb软件包 dpkg -i xxx.deb
 
删除软件包 dpkg -r xxx.deb
 
连同配置文件一起删除 dpkg -r --purge xxx.deb
 
查看软件包信息 dpkg -info xxx.deb
 
查看文件拷贝详情 dpkg -L xxx.deb
 
查看系统中已安装软件包信息 dpkg -l
 
重新配置软件包 dpkg-reconfigure xx
 
sudo dpkg -p package_name卸载软件包及其配置文件，但无法解决依赖关系！
 
sudo aptitude purge pkgname卸载软件包及其配置文件与依赖关系包！ 
 
清除所有已删除包的残馀配置文件
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
 
如果报如下错误，证明你的系统中没有残留配置文件了，无须担心。
```

## deb 安装格式
```sudo dpkg -i(install) <package.deb>```

```sudo apt-get install 软件包```
```sudo apt-get update```
```sudo apt-get remove  软件包```
```apt list postgresql*```

## 查看进程
```sudo netstat -tanlp```

## ps aux | grep 3000 查看端口是3000的进程

## 查看端口是否被占用
```netstat -nap | grep 80```

```tcp 0.0.0.0：80的tcp号为2683```
## 杀死进程
```sudo kill 2683```
强制终止
```sudo kill -9 2683```

```rm 文件路径```

## SSH(远程连接工具)
1. SSH是安全的加密协议，用于远程连接Linux服务器
2. SSH的默认端口是22，安全协议版本是SSH2
3. SSH服务器端主要包含2个服务功能SSH连接和SFTP服务器
4. SSH客户端包含ssh连接命令和远程拷贝scp命令等
```ssh root@IP地址```
## scp
**用于在Linux下进行远程拷贝文件的命令**
```scp user@192.168.xxx.xxx:/home/user/uro/* ~/```

**从服务器复制文件到本地**
```scp root@192.168.1.100:/data/test.txt /home/myfile/```
**从服务器复制文件夹到本地**
```scp -r root@192.168.1.100:/data/ /home/myfile/```
**复制文件(从本地复制文件到服务器)**
```scp /home/yt00796/uro/inv.server/engines/uaa/* user@192.168.xxx.xxx:/home/user/workspace/pcfollow.server/engines/uaa/```
**复制整个文件夹(从本地复制文件夹到服务器)**
```scp -r /home/yt00796/uro/inv.server/engines/uaa/ user@192.168.xxx.xxx:/home/user/workspace/pcfollow.server/engines/uaa/```

1. 删除文件夹
```rm -rf  fileNamede```
2. 删除文件
```rm -f  fileNamede```
3. 创建文件夹
```mkdir dir1```
4.  重命名/移动 一个目录
```mv dir1 new_dir```
4. 复制
```cp file1 file2```

**查看日志**
```tail -n 100 文件``` 
**让某个程序在后台运行**
```nohup npm start &```

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

sudo docker exec -it a437761a7a26 psql -U postgres

docker pull chorss/docker-pgadmin4
docker run -p 5050:5050  -e "PGADMIN_DEFAULT_EMAIL=test@boluome.com"  -e "PGADMIN_DEFAULT_PASSWORD=test"  -d chorss/docker-pgadmin4

docker run -p 5050:5050  -e "PGADMIN_DEFAULT_EMAIL=root@boluome.com"  -e "PGADMIN_DEFAULT_PASSWORD=root"  -d dpage/pgadmin4

cd /etc/nginx/
sudo cp sites-available/default sites-available/uro
sudo ln -s /etc/nginx/sites-available/uro sites-enabled/uro

  sudo systemctl restart nginx

命令行导入dump
psql -h 172.17.0.1 -p 54321  -U postgres pcfollow_development < pcf_pro.ustest.20190119

psql -U postgres -p 5432 

postgres

### 安装PostgreSQL客户端
sudo apt-get install postgresql-client

### 安装PostgreSQL服务器
sudo apt-get install postgresql

# Ubuntu 16.04卸载PostgresQL
```
ps -aux |grep postgresql ##查看postgresql进程是否仍在运行
sudo service postgresql stop ##暂停服务
sudo apt-get --purge remove postgresql ##卸载及删除安装包
```

### 模糊匹配
ctrl+r 

### history
history 查看历史
history|grep a 查看历史

### 环境初始化
```js
rails db:setup
bin/rails db:migrate RAILS_ENV=development
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

ctrl+shift+v vscode预览md

```lsb_release -a```

yum list 
convert --version
yum remove ImageMagick*
yum list ImageMagick*

Centos彻底删除已安装软件
1. 查询是否安装了软件
```rpm -qa | grep -i 软件名```

2. 删除已安装的软件包
```sudo rpm -e  -- 包名 # 普通删除模式```
```sudo rpm -e --nodeps 包名 #强力删除模式，如果用上面命令删除时，提示有依赖的其他文件，则用该命令可以对其进行强力删除```

C_INCLUDE_PATH=/usr/include/ImageMagick-6 PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/ gem install rmagick -v '4.0.0'



# CentOS 6.9上搭建Ruby on Rails 环境
## 安装rvm
```curl -L get.rvm.io | bash -s stable```

**抛错(需要导入public key)**
```
gpg: Can't check signature: No public key
GPG signature verification failed for '/home/user/.rvm/archives/rvm-1.29.9.tgz' - 'https://github.com/rvm/rvm/releases/download/1.29.9/1.29.9.tar.gz.asc'! Try to install GPG v2 and then fetch the public key:
gpg2 --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
```

**导入public key**

```gpg2 --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB```

**导入成功后,重新安装rvm**
```curl -L get.rvm.io | bash -s stable```
```source /home/user/.rvm/scripts/rvm```

## 安装ruby

**查看rvm库中已知的ruby版本**
```rvm list known```

**安装一个ruby版本**
```rvm install 2.5.2```
**抛错**
```user password required for 'yum install -y autoconf automake bison libffi-devel libtool readline-devel ruby sqlite-devel':```

**解决方案**
```yum install -y autoconf automake bison libffi-devel libtool readline-devel ruby sqlite-devel```

**设置默认的Ruby版本**
```rvm use ruby-2.5.2 --default```

## 安装rails
```rvm gemset create rails5```
```rvm use ruby-2.5.2@rails5```

# 下载node

```wget https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz ```
```xz -d node-v10.16.0-linux-x64.tar.xz```
```tar -xf node-v10.16.0-linux-x64.tar```
```ln -s /home/user/node-v10.16.0-linux-x64/bin/node /usr/bin/node```
```ln -s /home/user/node-v10.16.0-linux-x64/bin/npm /usr/bin/npm```

# 安装postgres
```docker pull postgres:10.0```
```docker run --name postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres:10```

1. 安装存储库RPM
```yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-6-i386/pgdg-redhat-repo-latest.noarch.rpm```
2. 安装客户端软件包
```yum install postgresql10```
3. 安装服务器包
```yum install postgresql10-server```
4. 初始化数据库并启用自动启动
```service postgresql-10 initdb```
```chkconfig postgresql-10 on```
```service postgresql-10 start```

## bundle install出错

1. ```gem install gem```出错
**报错信息**
```
checking for pg_config... no
No pg_config... trying anyway. If building fails, please try again with
 --with-pg-config=/path/to/pg_config
checking for libpq-fe.h... no
Can't find the 'libpq-fe.h header
```
**解决方案**
```gem install pg --with-pg-config=/usr/pgsql-10/bin/pg_config```

2. ```gem install sassc```出错
**报错信息**
```
Building native extensions. This could take a while...
ERROR:  Error installing sassc:
	ERROR: Failed to build gem native extension.

    current directory: /home/user/.rvm/gems/ruby-2.5.1@rails5/gems/sassc-1.12.1/ext
/home/user/.rvm/rubies/ruby-2.5.1/bin/ruby -rrubygems /home/user/.rvm/gems/ruby-2.5.1@rails5/gems/rake-12.3.2/exe/rake RUBYARCHDIR\=/home/user/.rvm/gems/ruby-2.5.1@rails5/extensions/x86_64-linux/2.5.0/sassc-1.12.1 RUBYLIBDIR\=/home/user/.rvm/gems/ruby-2.5.1@rails5/extensions/x86_64-linux/2.5.0/sassc-1.12.1
cd libsass
make lib/libsass.so
mkdir lib
```
**解决方案(升级GCC的版本)**
1. 查看GCC版本
```
# gcc --version | head -n1
gcc (GCC) 4.4.7 20120313 (Red Hat 4.4.7-23)
```
2. 安装新版本
```
yum install centos-release-scl-rh
yum install devtoolset-7-gcc devtoolset-7-gcc-c++ devtoolset-7-binutils
```

3. 配置GCC环境并检查版本
```
# cat << _EOF_ > /etc/profile.d/devtoolset.sh
> #!/bin/bash
> source scl_source enable devtoolset-7
> _EOF_

# gcc --version | head -n1
gcc (GCC) 4.4.7 20120313 (Red Hat 4.4.7-23)

# cat /etc/profile.d/devtoolset.sh
# source /etc/profile.d/devtoolset.sh
# gcc --version | head -n1

gcc (GCC) 7.3.1 20180303 (Red Hat 7.3.1-5)
```
4. 确认GCC配置好以后，再次执行bundle或者执行gem install sassc来安装

# 启动项目
```./bin/rails s```

**报错信息**
```
========================================
  Your Yarn packages are out of date!
  Please run `yarn install` to update.
========================================


To disable this check, please add `config.webpacker.check_yarn_integrity = false`
to your Rails development config file (config/environments/development.rb).


Error: Could not find or load main class check
```
1. 安装yarn
```
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum install yarn
```

2. ```yarn install```

# Ubuntu18.04.3上搭建Ruby on Rails 环境
## 安装rvm
- 安装 GPG keys
```gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB```
- 安装rvm
```\curl -sSL https://get.rvm.io | bash -s stable --rails```
```source /home/uro/.rvm/scripts/rvm```

## 用rvm安装ruby

1. 查看rvm库中已知的ruby版本
```rvm list known```

2. 安装一个ruby版本
```rvm install 2.5.2```

3. 设置ruby版本
```rvm use ruby-2.5.2 --default```

## 安装rails
```rvm gemset create rails5```
```rvm use ruby-2.5.2@rails5```

## 下载node

```wget https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz```
```xz -d node-v10.16.0-linux-x64.tar.xz```
```tar -xf node-v10.16.0-linux-x64.tar```
```ln -s /home/uro/Downloads/node-v10.16.0-linux-x64/bin/node /usr/bin/node```
```ln -s /home/uro/Downloads/node-v10.16.0-linux-x64/bin/npm /usr/bin/npm```

## postgresql
```https://www.postgresql.org/download/linux/ubuntu/```
- 更新软件包
```sudo apt update```
- 查看postgresql软件包版本
```apt list postgresql*```
- 安装postgresql10
```sudo apt-get install postgresql-10```
- 配置postgresql.conf
```
vi /etc/postgresql/10/main/postgresql.conf
将 #listen_addresses = 'localhost' 的注释去掉并改为 listen_addresses = '*' 
```
- 配置pg_hba.conf
```
vi /etc/postgresql/10/main/pg_hba.conf
# IPv4 local connections:
host    all             all             192.168.244.61/32       trust
```
- 重启数据库
```/etc/init.d/postgresql restart```
- 连接数据库
```psql -U postgres -p 5432  -h 192.168.244.xxx```

## bundle install

1. ```gem install pg```出错

**报错信息**
```
You need to install postgresql-server-dev-X.Y for building a server-side extension or libpq-dev for building a client-side application.
You need to install postgresql-server-dev-X.Y for building a server-side extension or libpq-dev for building a client-side application.
checking for libpq-fe.h... no
Can't find the 'libpq-fe.h header
```
**解决方案**
```sudo apt-get install postgresql-server-dev-10```
 /usr/bin/pg_config

2. ```gem install rmagick```

**报错信息**
```ERROR: Can't install RMagick 4.0.0. Can't find ImageMagick with pkg-config```

**解决方案**
```sudo apt-get install imagemagick libmagickcore-dev libmagickwand-dev```

## 启动项目
```./bin/rails s```

**报错信息**
```
========================================
  Your Yarn packages are out of date!
  Please run `yarn install` to update.
========================================


To disable this check, please add `config.webpacker.check_yarn_integrity = false`
to your Rails development config file (config/environments/development.rb).


sh: 1: yarn: not found
```
1. 安装yarn
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

2. ```yarn install```

## 初始化环境
```
rails db:setup
bin/rails db:migrate RAILS_ENV=development
```
## 导入数据

## Redis 服务端配置——Could not connect to Redis at 127.0.0.1:6379: Connection refused
```js
redis-cli
sudo apt install redis-tools

redis-server /etc/redis.conf
sudo apt install redis-server

redis-cli
// 127.0.0.1:6379> 
// successfully
```

## GIT Submodule的使用
当一个项目需要包含其他支持项目源码时使用的功能，作用是两个项目是独立的，且主项目可以使用另一个支持项目
```git submodule add <submodule_url>  # 添加子项目```
```
git submodule init  # 初始化本地.gitmodules文件
git submodule update  # 同步远端submodule源码
```
```git clone --recurse-submodules <main_project_url>  # 获取主项目和所有子项目源码```

docker start 981e843cdbc6 50a0004b6d6c
source /usr/share/rvm/scripts/rvm
rvm use ruby-2.5.5@rails5

关键字 site:()

vim ~/.bashrc

alias sshl='eval `ssh-agent -s` && ssh-add'
alias rvml='source /usr/share/rvm/scripts/rvm'

source ~/.bashrc

sshl

rvml

ps aux | grep 3000
netstat -nap | grep 3000
查看日志```tail -n 100 文件``` 
让某个程序在后台运行```nohup npm start &```

- Hospital.research_groups.each do |f|
  = f.inspect

  docker run --name bird_server -v /home/uro/data/pgdata/pca/bird_server/:/var/lib/postgresql/data/ -e POSTGRES_PASSWORD=postgres -p 25432:5432 -d postgres:10

  docker exec bird_server sh -c 'exec psql -U postgres -d bird_development < '
psql -h 172.17.0.1 -p 25432  -U postgres bird_development < bird_20190819_1402.sql
