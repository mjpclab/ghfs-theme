# ghfs-theme

GHFS（go-http-file-server）主题包。

## 注意
版本库分支是不稳定的，且可能在任何时候被squash或rebase。

## 构建
进入主题目录：
```sh
cd src/<theme>
```

生成主题内容：
```sh
make
```

输出内容可以在`output/<theme>/`下找到。

## 用法
```sh
ghfs --theme <主题包.zip>
ghfs --theme-dir <主题目录>	#建议仅用于调试
```

## 主题列表

### Default
![default theme](doc/img/ghfs.gif)

与GHFS内建主题相同。已对模板和静态资源压缩（minify）。

### Default Enhanced
![default enhanced theme](doc/img/ghfs-enhanced.gif)

基于Default主题增强。
用户可以在打包或删除时选择多个文件。
未增强的Default主题只能打包当前目录下所有文件。

增强的主题舍弃了对HTML5支持不佳的浏览器。
