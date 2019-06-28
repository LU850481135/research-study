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

## 散列
```散列是键值对的一种数据结构,在 Ruby 中，一般是以字符串或者符号（Symbol）作为键，来保存对应的对象```


