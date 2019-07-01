require "./grep" # 读取grep.rb（省略“.rb”）
pattern = Regexp.new(ARGV[0])
filename = ARGV[1]
simple_grep(pattern, filename) # 调用simple_grep 方法