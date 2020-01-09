# github/gitlab配置ssh key

## 解决方案

### 方案一：使用同一个邮箱

```js
git config --global user.name 'XXX' && git config --global user.email 'xxx@qq.com'

```

### 方案二：基于config文件

 **1. 生成秘钥**
 
 公司的GitLab生成一个SSH-Key
 ```
 ssh-keygen -t rsa -C "注册的gitlab邮箱" -f ~/.ssh/gitlab_id-rsa
 ```
 
公网github生成一个SSH-Key
```
 ssh-keygen -t rsa -C "注册的gitlab邮箱" -f ~/.ssh/gitlab_id-rsa
 ```

 **2. 添加config** 
 
在 ~/.ssh目录下，如果不存在，则新建 ```touch ~/.ssh/config```文件 ，文件内容添加如下：
```
# gitlab
Host gitlab.com
    HostName gitlab.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa
# github
Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_github
```
**3. 在github和gitlab网站添加ssh**

**4.  测试是否连接成功**

```
# 测试github
$ ssh -T git@github.com
// Hi test! You've successfully authenticated, but GitHub does not provide shell access.
# 测试gitlab
$ ssh -T git@gitlab.com
```

## git pull 与 git fetch的区别
**git fetch 相当于是从远程获取最新到本地，不会自动merge**
**git pull 相当于是从远程获取最新版本并merge到本地**