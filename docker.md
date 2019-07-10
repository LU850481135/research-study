# Docker
## 查看镜像详情
```docker inspect [ 镜像名 or 镜像 id ]```
## 关闭运行中的容器
```docker stop 容器ID```
## 启动一个已经停止的容器
```docker start 容器ID```
## 重启一个容器
```docker restart 容器ID```
## 显示当前运行的容器
```docker ps```
## 显示全部容器
```docker ps -a```
## 查看本地镜像
```docker images```
## 删除容器
```docker rm 容器ID```
## 删除所有容器
```docker rm $(docker ps -a)```
## 查看历史
```docker history 镜像ID```
## 创建、启动容器并执行相应的命令
```docker run [ 参数 ] [ 镜像名 or 镜像 id ] [ 命令 ]```
## 查看容器中正在运行的进程
```docker top [ 容器名 or 容器 id ]```