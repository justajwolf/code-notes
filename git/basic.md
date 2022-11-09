# git基本命令
## 配置命令（全局/本地配置）

1. 常见配置

   ```bash
   # 查看当前git配置(local覆盖glbal之后的配置)
   git config --list
   # 查看全局git配置
   git config --list --global
   # 查看本地git配置
   git config --list --local
   
   # 全局设置user信息
   git config --global user.name "username"
   git config --global user.email "email"
   
   # 本地设置user邮箱信息(覆盖global)
   git config --global user.email "email" 
   
   # 全局设置自动crlf关闭
   git config --global core.autocrlf false
   
   # 全局设置代码差异性分析工具
   # 差异性分析工具：kdiff3，tkdiff，meld，xxdiff，emerge，vimdiff，gvimdiff，ecmerge，opendiff 
   git config --global merge.tool vimdiff    
   
   # 全局设置git默认文本编辑器
   git config --global core.editor vim
   ```

2. 代理配置

   ```bash
   # 全局设置http请求github.com的socks5代理
   git config --global http.https://github.com.proxy socks5://<ip>:<port>
   
   # 全局设置https请求github.com的socks5代理
   git config --global https.https://github.com.proxy socks5://<ip>:<port>
   ```
3. 文件权限

   ```bash
   # 查看当前文件权限
   git ls-files --stage [file.sh]

   # 给指定文件添加可执行权限
   git update-index --chmod +x [file.sh]
   ```

## 常用基础命令（工作场景）

1. 远程仓库 to 本地仓库

   ```bash
   # 克隆仓库 默认分支
   git clone <url>
   
   # git 忽略自签证书ssl验证
   git clone -c http.sslVerify=false <url>
       
   # 克隆仓库 指定分支
   git clone -b <branchName> <url>
   
   # 更新本地仓库信息
   git remote update origin --prune
   ```

2. 删除分支

   ```bash
   # 删除本地分支
   git branch -d <branchName>
   git branch -delete <branchName>
   
   # 删除远程分支
   git push origin -d <branchName>
   git push origin --delete <branchName>
   ```

3. 远程分支 <=> 本地分支 

   ```bash
   # 建议本地分支名 同 远程分支名保持一致
   # 创建本地分支，关联到远程分支，拉取远程分支代码到新建本地分支，并切换到本地新建分支
   git checkout -b <branchName> origin/<branchName>
   
   # 创建本地分支
   git branch <branchName>

   # 创建本地分支，并切换到新建分支
   git checkout -b <branchName>
   git switch -c <branchName>
   
   # 本地切换分支
   git checkout <branchName>
   git switch <branchName>
   
   # 拉取远程分支代码(默认关联的远程分支)
   git pull
   
   # 拉取远程分支代码(指定远程分支名)
   git pull origin <branchName>
   
   # 合并指定分支到当前分支
   git merge <branchName>
   
   # 取消当前合并，合并中止(当合并或者冲突解决混乱时，中止本次合并，恢复到合并前的状态，以便于重新合并)
   git merge --abort
   
   # 添加代码到工作区(当前目录/指定文件)
   git add .
   git add <filename>
   
   # 提交到本地暂存区
   git commit -m "本次提交说明"
   
   # 推送代码 到 远程分支代码(默认关联的远程分支)
   git push
   # 强制推送到远程分支（长用于reset之后，推送本地最新修改commit到远程分支，覆盖掉reset之前的commit，谨慎使用）
   git push -f
   git push --force
   
   # 推送代码 到 远程分支代码(指定远程分支名)
   git push origin <branchName>
   ```

4. 版本回退

   ```bash
   # 本地 回退到 上次提交 (撤回修改代码到未提交状态)
   git reset HEAD^
   
   # 本地强制 回退到 上次提交 (删除修改代码)
   git reset --hard HEAD^
   
   # 本地 回退到 指定commitId
   git reset <commitId>
   git reset --hard <commitId>
   ```

5. 本地常见操作

   ```bash
   # 查看提交记录（常见用于reset时候，获取commitId）
   git log
   
   # 查看本地仓库，当前分支的所有操作记录（常见于reset之后，想还原回去，寻找commitId，以及查看当前分支checkout自哪个分支）
   git reflog
   
   # 查看本地工作树状态
   git status
   
   # 查看本地分支列表
   git branch
   git branch --all
   git branch --r
   git branch --l
   git branch --vv

   # 修改本地分支名
   git branch -m oldName newName

   # 恢复暂存区所有文件内容 到 工作区
   git checkout .
   # 恢复暂存区指定文件 到 工作区
   git checkout <fileName>
   git checkout <commitId> <fileName>
   ```
6. 常见操作扩展

   - 修改上一次提交信息(previous commit), [详见2.4](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Thingss)

      ```bash
      # 修改上一次提交msg
      git commit --amend -m "new msg"

      # 给上次提交补充 补充修改内容
      git add [file]
      git commit --amend
      ```

## 管道命令（写脚本，写库等场景）

1. rev-parse
   ```bash
   # 查看当前位置相对于.git目录的深度
   git rev-parse --show-cdup
   ```