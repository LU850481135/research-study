
# git submodule的使用
- 使用场景
当两个不同的项目共用同一套逻辑,这时我们需要使用另一个项目。 也许是第三方库，或者你独立开发的，用于多个父项目的库。这时可以通过git子模块来解决这个问题.
- 例子
  pc端: 主要用于配置选项来拼装一个完整的调查问卷系统(包含单个问卷的预览)
  mobile端: 显示问卷以及问卷的作答
  子模块项目: 需要将每个类型的题目分装成组件,供pc端以及mobile端共同使用
- 使用
1. 添加子模块
```bash
# 进入主项目
cd workspace
# 给主项目添加子项目,指定子模块克隆到本地src/template文件夹
git submodule add git@github.com:XXX/research-study.git src/template
# 添加子模块后运行
git status # 可以看到目录增加两个文件
           # 1. .gitmodules文件(主要用于保存子模块信息)
           # 2. src/template文件夹(主要用于存放子模块最新一次commit id)
# 将这两个文件提交到主项目远程
git add .
git commit -m 'add submodule'
git push origin dev
```
2. 克隆包含子模块的项目
```bash
# 获取主项目和所有子项目源码
git clone --recurse-submodules <main_project_url>
```

3. 初始化子模块
```bash
# 初始化模块只需在克隆父项目后运行一次
git submodule init  # 初始化本地.gitmodules文件
```

4. 更新子模块代码
```bash
# 更新子模块代码
git submodule update  # 同步远端submodule源码
```

## 子模块提交代码步骤:
1. 提交子模块代码
```bash
# 从主项目进入子项目目录
cd src/template/
# 修改子模块代码
# 提交子模块代码
git add .
git commit -m 'XXX'
git push origin dev
```
2. 将主模块与子模块相关联的commit id更新到远程
```bash
# 进入主项目
git status
# 提示子模块代码有新的提交
modified:   src/template (new commits, modified content)
# 查看两个版本的差异(子模块的commit id更新为最后一次提交)
git diff src/template
#-Subproject commit 475f9e2bfab0201be2628ed3ae41e1496f25dd00
#+Subproject commit 2203a7b0228338748cf0d30f6d46a23165f4665f

# 将主模块与子模块相关联的commit id更新到远程
git add src/template
git commit -m 'update submodule commit id'
git push origin dev
```
3. 当子项目有更新时,需要在主项目执行```git submodule update```来更新子模块代码