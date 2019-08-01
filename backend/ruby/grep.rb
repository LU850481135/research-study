# 分析该日志(nginx的access log), 统计出每天, 每小时的访问量
def simple_grep(pattern, filename)
  day = []
  hour = []
  file = File.open(filename)
  file.each_line do |line|
    line.match(pattern) do |matched|
      day << matched[1]
      hour << matched[0]
    end
  end
  hourTraffic = statisticalCount(hour)
  p hourTraffic
  dayTraffic = statisticalCount(day)
  p dayTraffic
  file.close
end

def statisticalCount(ary)
  h = Hash.new(0)
  ary.each do | v |
    h.store(v, h[v]+1)
  end
  return h
end

simple_grep(/\[(.*?)\:(..)/, 'access.log')