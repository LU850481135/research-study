# filename = ARGV[0]
# file = File.open(filename)
# text = file.read
# print text
# file.close

# filename = ARGV[0]
# text = File.read(filename)
# print text

filename = ARGV[0]
file = File.open(filename)
file.each_line do |line|
print line
end
file.close