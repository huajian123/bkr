### 使用ngUfast
+ 执行切换npm源
```html
npm config set registry http://192.168.2.102:8081/repository/npm/
```
+ 安装依赖
```html
npm install -d ng-ufast
```
+ 创建一个module
```html
// 这里的n代表name，也可以填name
ng g ng-ufast:bkr-m --n="moduleFileName"
//执行完后将在views文件夹下生成module-file-name文件夹
//里面包含module-file-name.module.ts，module-file-name-routing.module.ts
```
+ 创建一个二级菜单
```html
// 生成无checkbox的列表 fl表示模块菜单的名字，sl表示列表组件的名字
ng g ng-ufast:bkr-l --fl="ceshi" --sl="baaa"
//生产有checkbox的列表
ng g ng-ufast:bkr-l-c --fl="huajian" --sl="huajian2"
```
+ 创建一个service
```html
// fn也可以写filename，表示文件夹名。 n也可以写作name，表示文件名
ng g ng-ufast:bkr-s --fn="fuwu" --n="aaa"

```

