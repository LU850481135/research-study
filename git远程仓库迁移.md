
## Git远程仓库迁移
1.  通过删除远程仓库创建新的仓库进行迁移
```javascript
# 查看远程仓库
$ git remote
origin
# 重命名远程仓库
$ git remote rename origin old-origin
# 添加一个新的远程 Git 仓库
$ git remote add origin 新仓库地址
# 查看远程仓库Git保存的简写与其对应的 URL
$ git remote -v
old-origin	https://github.com/test/research-study (fetch)
old-origin	https://github.com/test/research-study (push)
origin	https://github.com/frontend/research-study (fetch)
origin	https://github.com/frontend/research-study (push)
# 删除远程仓库
$ git remote remove old-origin
# 查看是否迁移成功
$ git remote -v
origin	https://github.com/frontend/research-study (fetch)
origin	https://github.com/frontend/research-study (push)
```

2. 通过重置远程仓库进行迁移
```javascript
# 查看当前的远程仓库
$ git remote -v
origin	https://github.com/test/research-study (fetch)
origin	https://github.com/test/research-study (push)
# 使用git remote set-url重置为新的仓库
$ git remote set-url origin https://github.com/frontend/research-study
# 查看是否迁移成功
$ git remote -v
origin	https://github.com/frontend/research-study (fetch)
origin	https://github.com/frontend/research-study (push)
```