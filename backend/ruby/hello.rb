# encoding: UTF-8
print("你好呀, Ruby.\n")
puts "Hello, \nRuby."
p "Hello, \n\tRuby."

x = 10
y = 20
z = 30
area = (x*y + y*z + z*x) * 2
volume = x * y * z
print "表面积=", area, "\n"
print "体积=", volume, "\n"

def h(name)
  puts "Hello #{name}!"
end

h('liulu')

def h(name = "World")
  puts "Hello #{name.capitalize}!"
end

h "chris"

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

puts "-----------------------------"


class MegaGreeter
  attr_accessor :names

  # Create the object
  def initialize(names = "World")
    @names = names
  end

  # Say hi to everybody
  def say_hi
    if @names.nil?
      puts "..."
    elsif @names.respond_to?("each")
      # @names is a list of some kind, iterate!
      @names.each do |name|
        puts "Hello #{name}!"
      end
    else
      puts "Hello #{@names}!"
    end
  end

  # Say bye to everybody
  def say_bye
    if @names.nil?
      puts "..."
    elsif @names.respond_to?("join")
      # Join the list elements with commas
      puts "Goodbye #{@names.join(", ")}.  Come back soon!"
    else
      puts "Goodbye #{@names}.  Come back soon!"
    end
  end

end


if __FILE__ == $0
  mg = MegaGreeter.new
  mg.say_hi
  mg.say_bye

  # Change name to be "Zeke"
  mg.names = "Zeke"
  mg.say_hi
  mg.say_bye

  # Change the name to an array of names
  mg.names = ["Albert", "Brenda", "Charles",
    "Dave", "Engelbert"]
  mg.say_hi
  mg.say_bye

  # Change to nil
  mg.names = nil
  mg.say_hi
  mg.say_bye
end

# 存取器
# 直接访问实例变量或对实例变量赋值
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
p bob.name = "liulu"
bob.hello

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


class HelloCount
  # 调用hello 方法的次数
  @@count = 0
  # 读取调用次数的类方法
  def HelloCount.count
    @@count
  end
  def initialize(myname="Ruby")
    @name = myname
  end
  def hello
    @@count += 1 # 累加调用次数
    puts "Hello, world. I am #{@name}.\n"
  end
end

bob = HelloCount.new("Bob")
alice = HelloCount.new("Alice")
ruby = HelloCount.new
p HelloCount.count
# => 0
bob.hello
# Hello, world. I am Bob.
alice.hello
# Hello, world. I am Alice.
ruby.hello
# Hello, world. I am Ruby.
p HelloCount.count
# => 3


# public 与 private
class AccTest
  def pub
    puts "pub is a public method."
  end
  public :pub # 把pub 方法设定为public（可省略）
  def priv
    puts "priv is a private method."
  end
  private :priv # 把priv 方法设定为private
end

acc = AccTest.new
acc.pub
# pub is a public method.
# acc.priv
# NoMethodError

# 块
# yield 语句
def total(from, to)
  result = 0
  from.upto(to) do |num|
    if block_given?
      result += yield(num)
    else
      result += num
    end
  end
  return result
end

p total(1, 10)
p total(1, 10){|num| num ** 2 }

# 将块封装为对象
# &block
def total(from, to, &block)
  result = 0
  from.upto(to) do |num|
    if block
      result += block.call(num)
    else
      result += num
    end
  end
  return result
end

p total(1, 10)
p total(1, 10){|num| num ** 2 }