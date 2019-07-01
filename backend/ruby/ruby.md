# Ruby

## 1.1 Ruby 的运行方法

### 1.1.1 hello.rb

``` 
cd c:
ruby helloruby.rb
```

### 1.1.2  irb 命令的执行方法
```
> irb
irb(main):001:0>print("Hello, Ruby.\n")
Hello, Ruby.
=> nil
```

```字符串、数值、时间等各种数据，在 Ruby 中都是对象。```

## 1.2 字符串

### 1.2.1 \n与\
- \n 换行符
- \ 转义符
```js
// 输出 Hello, "Ruby".
print("Hello, \"Ruby\".\n")

// 输出 Hello \ Ruby!
print("Hello \\ Ruby!")
```

### 1.2.2 ' ' 与 " "

```js
// 输出 Hello, \nRuby\n!\n
print('Hello, \nRuby\n!\n')
```

## 1.3 方法的调用

```Ruby 在调用方法时可以省略 ()。```

## 1.4 puts与print的区别
```puts 方法与 print 方法稍有区别，puts 方法在输出结果的末尾一定会输出换行符。```

## 1.5 p 方法
```js
puts "100" #=> 100
puts 100 #=> 100
p "100" #=> "100"
p 100 #=> 100

// 输出 Hello, Ruby.
print("Hello, Ruby.\n")

// Hello,
// Ruby.
puts "Hello, \nRuby."

// "Hello, \n\tRuby."
p "Hello, \n\tRuby."
```

## 1.6 编码问题
```js
> ruby kiritsubo.rb
kiritsubo.rb:1: invalid multibyte char (US-ASCII)
kiritsubo.rb:1: invalid multibyte char (US-ASCII)
```
**解决方案**
```Ruby 程序的编码方式，是通过在程序的首行代码添加注释“# encoding: 编码方式”```
例如:
```js
# encoding: UTF-8
print("你好呀, Ruby.\n")
```
## 1.7 数值
### Fixnum 整数对象
### Float 浮点数对象

## 1.8 变量
```js
x = 10
y = 20
z = 30
area = (x*y + y*z + z*x) * 2
volume = x * y * z
print "表面积=", area, "\n"
print "体积=", volume, "\n"
```
输出:  表面积=2200
      体积=6000

```puts "表面积 = #{area}"```

## 1.9 注释
```Ruby 用#表示注释的开始```

## 1.10 控制语句
- 顺序控制：按照程序的编写顺序，从头到尾执行。
- 条件控制：若某条件成立，则执行○○，否则执行 ××。
- 循环控制：在某条件成立之前，反复执行○○。
- 异常控制：发生某种异常时，执行○○。

## 1.11 条件判断：if～then～end

```js
if 条件 then
  条件成立时执行的处理
else
  条件不成立时执行的处理
end
```

```js
a = 20
if a >= 10 then
  print "bigger\n"
end
// then 可以省略
if a <= 9
  print "smaller\n"
end
```

## 1.12 循环

### 1.12.1 while 语句

```js
while 循环条件 do
  希望循环的处理
end
```

```js
i = 1
while i <= 10
  print i, "\n"
  i = i + 1
end
```

### 1.12.2 times 方法
```循环处理的循环次数如果已确定，使用 times 方法会更加简单。```

```js
循环次数 .times do
  希望循环的处理
end
```

```js
100.times do
  print "All work and no play makes Jack a dull boy.\n"
end
```

### def 定义函数
```
# 对象
class Greeter
  def initialize(name = "word")
    @name = name
  end
  def say_hi
    puts "Hi #{@name}!"
  end
  def say_bye
    puts "Bye #{@name}, come back soon."
  end
end

g = Greeter.new("Pat")
g.say_hi
g.say_bye

Greeter.instance_methods

g.respond_to?("name")   =>  false

# g是否支持 say_hi 函数
g.respond_to?("say_hi")   =>  true
```

Greeter对象包含的```所有```的函数
```Greeter.instance_methods```
Greeter对象自定义函数
```Greeter.instance_methods(false)```

## 循环，迭代
如果 @names 对象可以回应 each 函数，那它就是可以被迭代的

迭代结构
```
@names.each do |name|
  puts "Hello #{name}!"
end
```

**@names 是否支持 join 函数**
```@names.respond_to?("join")```

## if __FILE__ == $0    程序入口

```__FILE__```是一个 魔法值

## 2.1 数组

```js
// 空数组
names = []

names = ["小林", "林", "高野", "森冈"]
// 小林
names[0]
// 林
names[1]

names[5] = "刘露"
// ["小林", "林", "高野", "森冈", nil, "刘露"]
names

// 返回数组长度
names.size

// 遍历数组
names.each do |item|
  pust item
end
```

```不同点```
- **在保存对象时，如果指定了数组中不存在的索引值时，则数组的大小会随之而改变,用nil占位**
```即动态数组```
- ```names.size```返回数组长度
- 遍历数组
  ```js
  数组 .each do | 变量 |
    希望循环的处理
  end
  ```

## 2.2 散列
```散列是键值对的一种数据结构,在 Ruby 中，一般是以字符串或者符号（Symbol）作为键，来保存对应的对象```
eg:```address = {:name => "高桥", :pinyin => "gaoqiao", :postal => "1234567"}```

### 符号
符号也是对象，一般作为名称标签来使用，用来表示方法等的对象的名称.可以将符号简单理解为```为轻量级的字符串```
```js
sym = :foo
sym2 = :"foo"
```
### 符号与字符串之间的转换
**符号转字符串**
```to_s()```
**字符串转符号**
```to_sym()```

```js
>> irb
>> sym = "foo"
=> "foo"
>> sym.to_sym()
=> :foo
>> :foo.to_s()
=> "foo"
```

### 散列使用
```js
>> address = {name: "高桥", pinyin: "gaoqiao"}
=> {:name=>"高桥", :pinyin=>"gaoqiao"}
>> address[:name]
=> "高桥"
>> address[:name] = "刘露"
=> "刘露"
>> address
=> {:name=>"刘露", :pinyin=>"gaoqiao"}
>> address[:tel] = "17809212776"
=> 17809212776
>> address
=> {:name=>"刘露", :pinyin=>"gaoqiao", :tel=>17809212776}
```
**错误使用 address[name]**
```js
>> address = {name: "高桥", pinyin: "gaoqiao"}
=> {:name=>"高桥", :pinyin=>"gaoqiao"}
>> address[name]
=> NameError (undefined local variable or method `name' for main:Object)
```

### 散列的循环
**语法**
```js
散列 .each do | 键变量 , 值变量 |
  希望循环的处理
end
```
**例子**
```js
>> address = {name: "高桥", pinyin: "gaoqiao"}
=> {:name=>"高桥", :pinyin=>"gaoqiao"}
>> address.each do |key, value|
?>   puts "#{key}: #{value}"
>> end
name: 高桥
pinyin: gaoqiao
=> {:name=>"高桥", :pinyin=>"gaoqiao"}
```

## 2.3 正则表达式
**语法**
```/Ruby/```

### 匹配字符串
**/ 模式 / =~ 希望匹配的字符串**
```若匹配成功则返回匹配部分的位置(从0开始计数),反之则返回 nil```

**例子**
```js
>> /Ruby/ =~ "Yet Another Ruby Hacker,"
=> 12
>> /Yet Another Ruby Hacker,/ =~ "Ruby"
=> nil
```

```正则表达式右边的 / 后面加上 i 表示不区分大小写匹配```
```js
>> /Ruby/ =~ "ruby"
=> nil
>> /Ruby/ =~ "RUBY"
=> nil
>> /Ruby/i =~ "ruby"
=> 0
>> /Ruby/i =~ "RUBY"
=> 0
>> /Ruby/i =~ "rUbY"
=> 0
```

**nil 是什么**
nil 是一个特殊的值，表示对象不存在

# 3.创建命令
```本章介绍 Ruby 从命令行读取并处理数据的方法```

## 3.1 命令行的输入数据

### ARGV
Ruby 程序中，使用 ```ARGV``` 这个 Ruby 预定义好的数组来获取从命令行传递过来的数据。数组 ARGV 中的元
素，就是在命令行中指定的脚本字符串参数。

**代码清单 print_argv.rb**
```js
puts "首个参数: #{ARGV[0]}"
puts "第2 个参数: #{ARGV[1]}"
puts "第3 个参数: #{ARGV[2]}"
```
**执行示例**
```js
> ruby print_argv.rb 1st 2nd 3rd
  首个参数: 1st
  第 2 个参数: 2nd
  第 3 个参数: 3rd
```

**代码清单 happy_birth.rb**
```js
name = ARGV[0]
print "Happy Birthday, ", name, "!\n"
```
**执行示例**
```js
> ruby happy_birth.rb Ruby
  Happy Birthday, Ruby!
```

**to_i()**
```把字符串转换为整数```
**代码清单 arg_arith.rb**
```js
num0 = ARGV[0].to_i
num1 = ARGV[1].to_i
puts "#{num0} + #{num1} = #{num0 + num1}"
puts "#{num0} - #{num1} = #{num0 - num1}"
puts "#{num0} * #{num1} = #{num0 * num1}"
puts "#{num0} / #{num1} = #{num0 / num1}"
```
**执行示例**
```js
> ruby arg_arith.rb 5 3
  5 + 3 = 8
  5 - 3 = 2
  5 * 3 = 15
  5 / 3 = 1
```

## 3.2 文件的读取
Ruby 脚本除了读取命令行传递过来的字符串参数外，还可以读取预先写在文件里的数据
Ruby 的源代码中，有一个名为 ChangeLog 的文本文件。文件里面记录了 Ruby 相关的修改日志

### 读取文件内容的流程 ?
① 打开文件
② 读取文件的文本数据
③ 输出文件的文本数据
④ 关闭文件

### 从文件中读取指定模式的内容并输出 ?

## 方法的定义
**语法**
```js
def 方法名
  希望执行的处理
end
```
**例子**
```js
def h(name)
  puts "Hello #{name}!"
end
h('liulu')
```

## 其他文件的引用
### require
```require 希望使用的库名```

# 4.对象、变量和常量

## 4.1 对象
- 数值对象
- 数值对象
- 数组对象、散列对象
- 正则表达式对象
- 时间对象
- 文件对象
- 符号对象
除此以外，Ruby 还有范围对象（Range）、异常对象（Exception）等

## 4.2 类
Ruby 的类（class）表示的就是对象的种类
对象拥有什么特性等，这些都是由类来决定的。到目前为止，我们介绍过的对象与其所属类的对应关系
- Numeric(数值)
- String(数值)
- Array(数组)
- Hash(散列)
- Regexp(正则)
- File(文件)
- Symbol(符号)

eg: ```字符串对象 "foo" 是 String 类的实例```

## 4.3 变量
- 局部变量（local variable）以英文字母或者 _ 开头
- 全局变量（global variable）以 $ 开头
- 实例变量（instance variable）以 @ 开头
- 类变量（class variable）以 @@ 开头

特殊变量
- 伪变量（pseudo variable）预先定义好的代表某特定值的特殊变量,nil、true、false、self
- 预定义变量（Pre-defined Variable）

## 4.4 常量
常量以大写英文字母开头,常量的作用和变量一样，是某个对象的“名片”。不过与变量不同的是，对已经赋值的常量再进行赋值时，Ruby 会做出警
告

## 4.5 保留字
在程序中作为名称使用时会受到限制。这些受到限制的单词，我们称为保留字

## 4.6 多重赋值

```a, b, c = 1, 2, 3```

### 合并执行多个赋值操作
即使= 左右两边列表的数量不相等,不会报错,Ruby 会自动将 nil 赋值给未分配值的变量
```js
>> a, b, c, d = 1, 2
>> p [a, b, c]
=> [1, 2, nil]
```

变量前加上```*```，表示 Ruby 会将未分配的值封装为数组赋值给该变量
```js
>> a, b, *c = 1, 2, 3, 4, 5
>> p [a, b, c] 
=> [1, 2, [3, 4, 5]]

>> a, *b, c = 1, 2, 3, 4, 5
>> p [a, b, c] 
=> [1, [2, 3, 4], 5]
```
### 置换

```js
>> a, b = 1, 2
>> tmp = a
>> a = b
>> b = temp
>> p [a, b]
=> [2, 1]
```

**等价于**

```js
>> a, b = 0, 1
// 置换变量a、b 的值
>> a, b = b, a
>> p [a, b]
=> [1, 0]
```

### 获取数组的元素
用数组赋值，左边有多个变量时，Ruby 会自动获取数组的元素进行多重赋值

```js
>> ary = [1, 2]
>> a, b = ary
>> p a
=> 1
>> p b
=> 2
```

### 获取嵌套数组的元素
**只要等号左边的变量的结构与数组的结构一致，即使再复杂的结构，多重赋值都可以轻松对应**
```js
>> ry = [1, [2, 3], 4]
>> a, b, c = ary
>> p a
=> 1
>> p b
=> [2, 3]
>> p c
=> 4
```

```js
>> ary = [1, [2, 3], 4]
// 与数组结构相对应的变量赋值
>> a, (b1, b2), c = ary
>> p a
=> 1
>> p b1
=> 2
>> p b2
=> 3
>> p c
=> 4
```
# 5.条件判断

```js
>> p "".empty?
=> true
>> p "AAA".empty?
=> false

>> p /Ruby/ =~ "Ruby"
=> 0
>> p /Ruby/ =~ "Diamond"
=> nil
```

## 假 false 、 nil
## 真 false 、 nil 以外的所有对象

## 逻辑运算符

**&&和||**

## if 语句

then可以省略
```js
if 条件 1 then
  处理 1
elsif 条件 2 then
  处理 2
elsif 条件 3 then
  处理 3
else
  处理 4
end
```

##  unless 语句
unless 语句的用法刚好与 if 语句相反

```js
// 可以省略then
unless 条件 then
  处理
end
```

```js
unless 条件
  处理 1
else
  处理 2
end
```
```等价于```
```js
if 条件
  处理 2
else
  处理 1
end
```

## case 语句
可以省略then
```js
case 比较对象
when 值 1 then
  处理 1
when 值 2 then
  处理 2
when 值 3 then
  处理 3
else
  处理 4
end
```

## each_line()逐行读取数据

## === 与 case 语句
在 case 语句中，when 判断值是否相等时，实际是使用 === 运算符来判断的。左边是数值或者字符串时，=== 与== 的意义是一样的，除此以外，=== 还可以与=~ 一样用来判断正则表达式是否匹配，或者判断右边的对象是否属于左边的类，等等。对比单纯的判断两边的值是否相等，=== 能表达更加广义的“相等”
```js
>> p (/zz/ === "xyzzy") 
=> true
>> p (String === "xyzzy") 
=> true
>> p ((1..3) === 2) 
=> true
```

```js
puts "a 比b 大" if a > b
// 等价于
if a > b
  puts "a 比b 大"
end
```

## 对象的同一性
**所有的对象都有标识和值**
标识（ID）用来表示对象同一性。Ruby 中所有对象都是唯一的，对象的 ID 可以通过 object_id（或者 __id__）方法取得

```js
>> arg = []
>> arg1 = []
>> p arg.object_id
=> 46941753737780
>> p arg.__id__
=> 46941753523960
```
### equal?
**判断两个对象是否同一个对象（ID 是否相同）**
```js
>> str1 = "foo"
>> str2 = str1
>> str3 = "f" + "o" + "o"
>> p str1.equal?(str2)
=> true
>> p str1.equal?(str3)
=> false
```

### ==
Ruby 使用 == 来判断对象的值是否相等

```js
>> str1 = "foo"
>> str2 = "f" + "o" + "o"
>> p str1 == str2 
=> true
```

除了 == 以外，Ruby 还提供 eql? 方法用来判断对象的值是否相等
== 与 eql? 都是 Object 类定义的方法，大部分情况下它们的执行结果都是一样的。但也有例外，数值类会重定义 eql? 方法，因此执行后有不一样结果
```js
>> p 1.0 == 1
=> true
>> p 1.0.eql?(1)
=> false
```

# 6.循环
- times 方法
- while 语句
- each 方法
- for 语句
- until 语句
- loop 方法

## times 方法
**是单纯执行一定次数的处理**
**语法**
```js
循环次数.times do
  希望循环的处理
end
```
```例子```
```js
7.times do
  puts "满地油菜花"
end

5.times do |i|
  puts "第#{i} 次的循环"
end
```

## for 语句
for 并不是方法，而是 Ruby 提供的```循环控制语句```
**语法**
```
for 变量 in 开始时的数值 ..结束时的数值 do
  希望循环的处理
end
```
**可以省略 do**
```js
>> sum = 0
>> for i in 1..5
>>  sum = sum + i
>> end
>> puts sum
=> 15
```

```sum = sum + i ``` 等价于 ```sum += i```
```a = a - b``` 等价于 ```a -= b```
```a = a * b ``` 等价于 ```a *= b```

## 普通的 for 语句
**语法**
```js
for 变量 in 对象 do
  希望循环的处理
end
```
```※ 可以省略 do```

```js
>> names = ["awk", "Perl", "Python", "Ruby"]
>> for name in names
>> puts name
>> end
```

## while 语句
```js
while 条件 do
  希望循环的处理
end
```
```※ 可以省略 do```

```js
>> i = 1
>> while i < 3
>>   puts i
>>   i += 1
>> end
=> ruby while.rb
   1
   2
```

## until 语句
与 if 语句相对的有 unless 语句，同样地，与 while 语句相对的有 until 语句

```js
until 条件 do
  不满足条件时,执行循环处理
end
```
```※ 可以省略 do```

## each 方法
```js
对象.each do | 变量 |
  希望循环的处理
end
```

```js
>> names = ["awk","Perl","Python","Ruby"]
>> names.each do |name|
>>   puts name
>> end
```

```js
对象.each {| 变量 |
  希望循环的处理
}
```
```等价于```
```js
for 变量 in 对象
  希望循环的处理
end
```

## loop 方法
还有一种循环的方法，没有终止循环条件，只是不断执行循环处理。Ruby 中的 loop 就是这样的循环方法

```js
loop do
  print "Ruby"
end
```

## 循环控制
**break**         **终止程序，跳出循环**
**next**          **跳到下一次循环**
**redo**          **在相同的条件下重复刚才的处理**

```js
>> puts "break 的例子:"
>> i = 0
>> ["Perl", "Python", "Ruby", "Scheme"].each do |lang|
>>  i += 1
>>  if i == 3
>>    break
>>  end
>>  p [i,lang]
>> end

>> puts "next 的例子:"
>> i = 0
>> ["Perl", "Python", "Ruby", "Scheme"].each do |lang|
>>  i += 1
>>  if i == 3
>>    next
>>  end
>>  p [i,lang]
>> end

>> puts "redo 的例子:"
>> i = 0
>> ["Perl", "Python", "Ruby", "Scheme"].each do |lang|
>>  i += 1
>>  if i == 3
>>    redo
>>  end
>>  p [i,lang]
>> end
```

```js
break 的例子:
[1, "Perl"]
[2, "Python"]

next 的例子:
[1, "Perl"]
[2, "Python"]
[4, "Scheme"]

redo 的例子:
[1, "Perl"]
[2, "Python"]
[4, "Ruby"]
[5, "Scheme"]
```

## 总结
- times方法                 确定循环次数时使用
- for语句                   从对象取出元素时使用（each 的语法糖）
- while语句                 希望自由指定循环条件时使用
- until语句                 使用 while 语句使循环条件变得难懂时使用
- each方法                  从对象取出元素时使用
- loop方法                  不限制循环次数时使用

## do～end 与 {～}
- 程序是跨行写的时候使用 do ～ end
- 程序写在 1 行的时候用 { ～ }

```js
10.times do |i|
  puts i
end
```
```js
10.times {|i| puts i}
```

# 7.方法
```对象. 方法名( 参数 1, 参数 2, … , 参数 n )```
## 方法的调用
### 运算符形式的方法调用
- obj + arg1
- obj =~ arg1
- -obj
- !obj
- obj[arg1]
- obj[arg1] = arg2

## 方法的分类
- 实例方法
- 类方法
- 函数式方法

### 实例方法
```js
>> p "10, 20, 30, 40".split(",")
=> ["10", "20", "30", "40"]
>> p [1, 2, 3, 4].index(4)
=> 3
>> p 1000.to_s
=> "1000"
```

### 类方法
```类名 . 方法名```   Array.new
```类名 :: 方法名```  Array::new
```js
// 创建新的数组
Array.new

// 创建新的文件对象
File.open("some_file")

// 创建新的 Time 对象
Time.now
```

### 函数式方法

```js
// 在命令行输出字符串
print "hello!"
// 在指定的时间内睡眠，终止程序
sleep(10)
```

## 方法的定义
```js
def 方法名( 参数 1, 参数 2, …)
  希望执行的处理
end
```

### 方法的返回值
```return```

### 定义带块的方法
```js
def myloop
  while true
    // 执行块
    yield
  end
end

// 初始化num
num = 1
myloop do
  // 输出num
  puts "num is #{num}"
  // num 超过 100 时跳出循环
  break if num > 100
  num *= 2
end

=>  num is 1
    num is 2
    num is 4
    num is 8
    num is 16
    num is 32
    num is 64
    num is 128
```

### 参数个数不确定的方法
```js
def foo(*args)
  args
end

p foo(1, 2, 3)
=> [1, 2, 3]
```
至少需要指定一个参数的方法
```js
def meth(arg, *agrs)
  [arg, args]
end

p meth(1)
=> [1, []]

p meth(1, 2, 3)
=> [1, [2, 3]]
```
```* 变量名```
```js
def a(a, *b, c)
  [a, b, c]
end

p a(1, 2, 3, 4, 5)
=> [1, [2, 3, 4], 5]

p a(1, 2)
=> [1, [], 2]
```

### 关键字参数
```参数可缺少/颠倒顺序,但不能把未定义的参数名传给方法,否则报错`
```js
def 方法名（参数 1: 参数 1 的值, 参数 2: 参数 2 的值, …)
  希望执行的处理
end
```

```js
def area2(x: 0, y: 0, z: 0)
  xy = x * y
  yz = y * z
  zx = z * x
  (xy + yz + zx ) * 2
end

p area2(x: 2, y: 3, z: 4)
=> 52
p area2(z: 4, y: 3, x: 2)
=> 52 （改变参数的顺序）
p area2(x: 2, z: 3)
=> 12 （省略y）
area2(foo: 0)
=> 错误：unknown keyword: foo（ArgumentError）
```

### **arg
为了避免调用方法时因指定了未定义的参数而报错，我们可以使用“** 变量名”的形式来 接收未定义的参数
```js
def meth(x: 0, y: 0, z: 0, **args)
  [x, y, z, args]
end

p meth(z: 4, y: 3, x: 2)
=> [2, 3, 4, {}]
p meth(x: 2, z: 3, v: 4, w: 5)
=> [2, 0, 3, {:v=>4, :w=>5}]
```


# 8.类和模块
## 类
类（class）是面向对象中一个重要的术语,类表示对象的种类
### 类和实例
**new 方法**
```生成新的对象```
```js
ary = Array.new
p ary
=> []
```
**class 方法**
```某个对象属于哪个类```
```js
ary = []
str = "Hello world."
p ary.class
=> Array
p str.class
=> String
```

**instance_of? 方法**
```判断某个对象是否属于某个类```
```js
ary = []
str = "Hello world."
p ary.instance_of?(Array)
=> true
p str.instance_of?(String)
=> true
p ary.instance_of?(String)
=> false
p str.instance_of?(Array)
=> false
```

## 继承
```js
basicObject
          - object
                  - Array
                  - String
                  - Hash
                  - Regexp
                  - IO
                      - File
                  - Dir
                  - Numeric
                      - Integer
                              - Fixnum
                              - Bignum
                      - Float
                      - Complex
                      - Rational
                  - Exception
                  - Time

```
### is-a 关系
eg: ```String 类与它的父类 Object 就是 is-a 关系```
**根据类的继承关系反向追查对象是否属于某个类**

```js
str = "This is a String."
p str.is_a?(String)
=> true
p str.is_a?(Object)
=> true
```

## 类的创建
**实例**
```js
// class 关键字
class HelloWorld
  // initialize 方法
  def initialize(myname = "Ruby")
    // 初始化实例变量
    @name = myname
  end
  // 实例方法
  def hello
    puts "Hello, world. I am #{@name}." 
  end
end

bob = HelloWorld.new("Bob")
alice = HelloWorld.new("Alice")
ruby = HelloWorld.new
bob.hello
```
###  class 关键字
```对象外部不能直接访问实例变量或对实例变量赋值```
**类名的首字母必须大写**
```js
class 类名
  类的定义
end
```
### initialize 方法
使用 new 方法生成新的对象时，initialize 方法会被调用,同时 new 方法的参数也会被原封不动地传给initialize 方法

**初始化对象**
```js
def initialize(myname = "Ruby")
  //初始化实例变量
  @name = myname
end
```

### 实例变量与实例方法

```js
def initialize(myname = "Ruby")
  //初始化实例变量
  @name = myname
end
```
```可以在实例方法中引用实例变量```

```js
// 实例方法
def hello
  puts "Hello, world. I am #{@name}."
end
```

### 存取器
在 Ruby 中，从对象外部不能直接访问实例变量或对实例变量赋值，需要通过方法来访问对象的内部
```js
class HelloWorld
  // 获取@name
  def name
    @name
  end
  // 修改@name
  def name=(value)
    @name = value
  end
end
```
**实例**
```js
class HelloWorld
  def initialize(myname = "Ruby")
    @name = myname
  end
  def name
    @name
  end
  def name=(value)
    @name = value
  end
  def hello
    puts "Hello, world. I am #{@name}." 
  end
end

bob = HelloWorld.new("Bob")
alice = HelloWorld.new("Alice")
ruby = HelloWorld.new
p bob.name
=> "Bob"
p bob.name = "liulu"
=> "liulu"
bob.hello
=> Hello, world. I am liulu.
```

```p bob.name = "liulu"```
乍一看，该语法很像是在给对象的属性赋值，但实际上却是在调用 name=("liulu") 这个方法。利用这样的方法，我们就可以突破 Ruby 原有的制，从外部来自由地访问对象内部的实例变量

### attr_reader
```attr_reader :name```         **只读**（定义 name 方法）
```attr_writer :name```         **只写**（定义 name= 方法）
```attr_accessor :name```       **读写**（定义以上两个方法）

```js
class HelloWorld
  attr_accessor :name
end
```

### 特殊变量 self

### 类方法
方法的接收者就是类本身（类对象）的方法称为类方法
```class << 类名 ~ end```
```class << self ~ end```
```def 类名 . 方法名 ~ end```
```只要是在 class 上下文中，这种形式下也可以像下面的例子那样使用 self```
```js
class << HelloWorld
  def hello(name)
    puts "#{name} said hello."
  end
end
HelloWorld.hello("John")

class HelloWorld
  class << self
    def hello(name)
      puts "#{name} said hello."
    end
  end
end
HelloWorld.hello("John")

def HelloWorld.hello(name)
  puts "#{name} said hello."
end

HelloWorld.hello("John")

class HelloWorld
  def self.hello(name)
    puts "#{name} said hello."
  end
end

HelloWorld.hello("John")
```

**备注 class << 类名 ~ end 这种写法的类定义称为单例类定义，单例类定义中定义的方法称为单例方法**

### 常量
在 class 上下文中可以定义常量,并通过```类名::常量```来访问
```js
class HelloWorld
  Version = "1.0"
end

p HelloWorld::Version
=> "1.0"
```
### 类变量
以 @@ 开头的变量称为类变量。类变量是该类所有实例的共享变量，这一点与常量类似，不同的是我们可以多次修改类变量的值