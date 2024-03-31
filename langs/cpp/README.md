# C/C++

快速编译执行命令，示例

```shell
# 正常编译
clang++ test.cpp -o test && ./test && rm -rf test

# 线程相关，使用 -lpthread 库编译
clang++ -lpthread test.cpp -o test && ./test && rm -rf test

# 线程相关，使用 c++11 新标准库 std::thread
clang++ -std=c++11 test.cpp  -o test && ./test && rm -rf test
```

查看宏定义结果命令，示例

```shell
clang++ -E test.cpp -o test && tail -10 test
```

## 语言特点

- 数据结构
  - 基本数据类型
    - 类型
      - 无类型：void
      - 布尔: bool
      - 字符：char，wchar_t
      - 数字：int，float，double
    - 类型修饰符
      - short，long
      - signed，unsigned
  - 新类型定义： typedef
  - 派生数据类型
    - enum
      - 枚举的常量在相同作用域中，会和别的常量名冲突
    - enum class
      - c++11，开始支持，枚举作用域
  - 类型转换
    - static_cast
    - dynamic_cast
    - const_cast
    - reinterpret_cast
  - 变量/函数
    - 类型
      - 基本数据类型
      - 指针类型：type*
      - 数组类型: type[]，type[size]
      - 结构体类型: struct type
      - 共用体类型: union type
      - 类类型: class type
    - 定义/声明：定义与声明可分开写
      - 定义
        - type `@var`;
        - type `@name`();
      - 声明
        - extern type `@var`;
  - 限定符
    - const
    - static
    - volatile
    - mutable
    - restrict
    - register
    - extern
    - auto
    - thread_local
- 内存管理
  - 分配
    - 变量定义，即分配内存： int a;
    - new
    - malloc
    - calloc
  - 释放
    - delete
    - free
- 运算符
  - 算数：`+`，`-`，`*`，`/`，`%`，`++`，`--`
  - 关系：`==`，`!=`，`>`，`>=`，`<`，`<=`
  - 逻辑：`&&`，`||`，`!`
  - 位算：`&`，`|`，`^`，`~`，`<<`，`>>`
  - 赋值：`=`，`[+-*/%]=`，`[&|^<<>>]=`
  - 杂项：`sizeof`，`cond ? x: y`，`,`，`.`，`->`，`Cast`，`&a`，`*a`
- 条件控制
  - if else
  - switch
- 循环控制
  - for
  - while / do……while
  - goto
- 函数
  - 定义：具体的函数头和函数体
    - `return_type function_name(parameters) { body }`
  - 声明：为了在当前文件中引用别的文件中的函数定义，需要在当前文件中定义被引用的函数头
  - 参数
    - 默认参数
    - 传递类型
      - 值
      - 引用
      - 指针
  - lambda 表达式：
    - `[capture](parameters) -> return-type { body }`
      - capture: =值传递，&引用传递
- 数学运算
  - 内置函数：`floor`，`pow`，……
    - `#include <cmath>`
  - 随机数：`srand((unsigned)time(NULL)); rand();`
    - `#include <ctime>`
- 数组
  - 定义：`type arrayName[arraySize];`
- 指针
  - 定义：`type* var-name;`
- 引用
  - 定义：`type& var = ref-var;`
- 类
  - 成员定义
    - 变量定义：同常规变量，放在类的作用域中
    - 函数定义：
      - 内联定义：
        - 声明和定义一起写在类中
        - 类中定义的函数都是内联函数
        - 可不用使用inline关键字
      - 分开定义：使用`范围解析运算符 ::`定义
        - 函数声明写在类中，函数定义写在类外
        - 函数声明和定义直接写在类外
    - 成员修饰符：public，protected，private
  - 构造函数：
    - `class_name()`
    - `class_name(parameters)`
    - 定义类对象时，调用
  - 析构函数：
    - `~class_name()`
    - 释放对象 / delete对象时，调用
  - 拷贝构造函数
    - `class_name(const class_name &obj)`
    - 类对象赋值时隐式自动调用
    - 默认可以不用定义，编辑器会自动补全一个定义
    - 当类成员中存在，指针变量 / 存在动态分配内存情况，拷贝构造函数必须显示定义
  - 友元：
    - 可以直接访问`class_a`的所有成员变量和函数，包括private和protected
    - 函数：`friend void func(class_name_a obj)`
    - 类：`friend class class_name_b`
  - this指针：
    - 类成员函数中，会存在隐式指针this，指向当前对象
    - 友元函数，没有this，因为它不是类成员你函数
  - 类指针：
    - 同普通指针用法一样，使用`->`可以访问类的成员变量和函数
  - 静态成员
    - 变量：初始化除了类内静态代码块外，只能在类外使用`范围解析运算符 ::`进行初始化
    - 函数：没有this指针，只能访问静态变量，静态函数，以及类外函数
  - 类继承
    - 继承修饰符：public，protected，private
      - class derived-class: access-specifier base-class
    - 多继承：可以同时继承多个类
  - 重载：类似hack行为，重新定义函数/运算符的执行逻辑
    - 类函数重载
      - 同名函数，参数列表一定不同(数量，类型)
    - 运算符重载
      - 成员函数形式：同正常函数一样
      - 非成员函数：友元函数形式
  - 多态：多个子类，对于同一个函数的不同函数体实现
    - 函数静态链接：
      - 函数根据类型，来寻找函数的实际定义
    - 函数动态链接：
      - 根据指针的实际类型，来寻找函数的实际定义
      - 关键字：`virtual`
      - 虚函数
        - 定义一个函数为虚函数，不代表函数为不被实现的函数，只是为了允许用基类的指针来调用子类的这个函数
        - 父类中，使用关键字 `virtual` 修饰，具体函数定义，被称为虚函数
        - 子类中，重新定义基类中定义的虚函数，不需要 `virtual` 修饰
      - 纯虚函数：
        - 可理解为抽象方法，含有至少一个纯虚函数的类，即为抽象类
        - 含有纯虚函数的类，不能被实例化，编译会报错，只能被继承
        - 例：`virtual int area() = 0;`
          - = 0 告诉编译器，函数没有主体，上面的虚函数是纯虚函数
- 泛型(模板)
  - 函数模板
    - 定义：`template <typename type> ret-type func-name(parameter list) { …… }`
  - 类模板
    - 定义：`template <class type> class class-name { …… }`
- 信号量
  - `signal()` 函数
    - `void (*signal (int sig, void (*func)(int)))(int);`
  - `raise()` 函数
- 多线程
  - 多任务：允许让电脑同时运行两个或两个以上的程序
    - 基于进程：
      - 多任务处理是程序的并发执行
    - 基于线程
      - 多任务处理是同一程序的片段的并发执行
  - 头文件：`#include <pthread.h>`
  - 创建线程：
    - `pthread_create (int* thread_id, pthread_attr_t* attr, func* run_func, void* run_func_arg)`
  - 退出线程：
    - `pthread_exit(void* arg);`
  - c++11 新标准库：
    - `#include <thread>`
    - `std::thread`
- cgi(web编程)

## 语言编译

- 预处理器
  - `#include`
    - `#include <a.h>`：加载系统文件
    - `#include "a.h"`：加载用户文件
  - `#define`(宏)
    - `#define` `macro-name` `replacement-text`
    - 文件中，后续出现的所有宏，都将会在程序编译之前被替换为 `replacement-text`
    - 参数宏
      - `#define MIN(a,b) (a<b ? a : b)`
      - `#define MKSTR( x ) #x`
        - `#` 运算符会把 `replacement-text` 令牌转换为用引号引起来的字符串
      - `#define CONCAT( x, y )  x ## y`
        - `##` 运算符用于连接两个令牌
  - `#ifdef, #endif、#else`，`#line`
  - 预定义宏
    - `__LINE__`：程序编译时，当前行号
    - `__FILE__`：程序编译时，当前文件名
    - `__DATE__`：形式为 month/day/year 的字符串，它表示把源文件转换为目标代码的日期
    - `__TIME__`：形式为 hour:minute:second 的字符串，它表示程序被编译的时间

- gcc
- g++
- clang
- clang++

## FQA

- `using` 和 `typedef` 的区别
- 编译器是如何编译 `头文件` 和 `源文件`
