## OSX 问题集

### 问题1
> 问题描述：

* gyp: No Xcode or CLT version detected! 报错

> 解决办法：
```shell
$ xcode-select --install
xcode-select: error: command line tools are already installed, use "Software Update" to install updates

$ sudo rm -rf $(xcode-select -print-path)

$ xcode-select --install
```
> 注意事项：

若不能安装该软件，因为当前无法从软件更新服务器获得，你就需要手动去苹果开发者下载中心下载 command line tools 的离线安装包了。

1. 打开开发者下载中心：https://developer.apple.com/download/more/
2. 搜索 command line tools（在搜索框中输入完要按一下回车键）
3. 选择适用于自己 macOS 系统的版本。
    ```
    10.15.x 可以下载 Command Line Tools for Xcode 11.4 及以上版本
    10.14.x 可以下载 Command Line Tools (macOS 10.14) for xxx，其中包含 macOS 10.14的。
    10.13.x 可以下载 Command Line Tools (macOS 10.13) for xxx，其中包含 macOS 10.13的。
    ```
下载完成后，安装一下，安装完成后就可以使用啦。