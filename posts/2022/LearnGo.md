---
id: 427fee41-e11e-4eb4-983d-287b6ffd9f84
title: LearnGo
slug: 376e1f75e3c128bdef9bd10fffbb7a
---
[TOC]

# 目录

## 1. 基础部分(1~5)
1. 基本结构：读写文件、文本格式化、创建图像、网络客户端、服务器通讯。
2. 基本元素：基本元素结构、变量、新类型定义、包和文件、作用域。
3. 基本数据类型：数字、布尔值、字符串、常量、Unicode字符。
4. 复合类型： 数组、字典、切片、动态列表。
5. 函数：错误处理、panic、recover、defer。


## 2. 其他部分
- 语言特色：方法、接口、并发、包、测试和反射。
- 面向对象的不同:
    - 没有类层次结构
    - 组合构建复杂对象
    -  具体类型和抽象类型（接口）之间的关系是隐式的

6. 方法
7. 接口
8. CSP的并发-goroutines/channels
    - go
    - defer
    - channels/chan
9. 共享变量的并发编程
10. 包和包的组织结构
11. 单元测试
12. 反射
13. 底层编程的细节

## 工具
1. 工具创建目录:
```shell
$ export GOPATH=$HOME/gobook    # 选择工作目录
$ go get gopl.io/ch1/helloworld # 获取/编译/安装
$ $GOPATH/bin/helloworld        # 运行程序
Hello, 世界                     # 这是中文
```

## TOO
- [x] Go语言圣经
