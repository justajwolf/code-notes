#### 一、初始化全局配置

```
$git config --list    
    //查看全局配置
$git config --global user.name "username"
$git config --global user.email "email"   
$git config --global merge.tool vimdiff    
    //解决差异性分析工具
    //差异性工具：
    kdiff3，tkdiff，meld，xxdiff，emerge，vimdiff，gvimdiff，ecmerge，和 opendiff 
$git config --global core.editor vim
     //设置默认文本编辑器
```

#### 二、git操作命令

```
1.克隆仓库
	git clone -b <branchName> <url>
2.删除本地分支
	git branch -d <branchName>
3.删除远程分支
    git push origin -d <branchName>
	git push origin --delete <branchName>
4.创建本地并建立与远程分支的关联，拉取远程分支
    git checkout -b <branchName> origin/<branchName>
5.版本回退(强制回退到上一个版本----代码丢失)
    git reset --hard HEAD^
6.合并中止
    git merge --abort
7.更新本地remote branch list
    git remote update origin --prune
```

