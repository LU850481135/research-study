# Rails
Rails 是使用 Ruby 语言编写的 Web 应用开发框架

## 启动 Web 服务器
```
$ cd blog
$ bin/rails server
```

## 命令行创建控制器和视图
```bin/rails generate controller Welcome index```

控制器位于
```app/controllers/welcome_controller.rb```
视图位于
```app/views/welcome/index.html.erb```

## 设置应用主页
**config/routes.rb**
```js
Rails.application.routes.draw do
  get 'welcome/index'
  // 定义资源
  resources :articles
  // 根路径的访问请求应该发往 welcome 控制器的 index 动作
  root 'welcome#index'
end
```

## Rails 路由

执行 ```bin/rails routes```命令，可以看到所有标准 REST 动作都具有对应的路由

| HTTP 方法 | 路径 | 控制器#动作 | 具名辅助方法  |
|:--------:| -------------:|--------:| -------------:|
| GET | /admin/articles | admin/articles#index | admin_articles_path
| GET | /admin/articles/new | admin/articles#new | new_admin_article_path
| POST | /admin/articles | admin/articles#create | admin_articles_path
| GET | /admin/articles/:id | admin/articles#show | admin_article_path(:id)
| GET | /admin/articles/:id/edit | admin/articles#edit | edit_admin_article_path(:id)
| PATCH/PUT | /admin/articles/:id | admin/articles#update | admin_article_path(:id)
| DELETE | /admin/articles/:id | admin/articles#destroy | admin_article_path(:id)

## 创建模型
```bin/rails generate model Article title:string text:text```
创建字段,并将这两个属性会自动添加到数据库的 articles 表中，并映射到 Article 模型上
并在 db/migrate 文件夹中生成数据库迁移文件
```迁移```是用于简化创建和修改数据库表操作的 Ruby 类
```bin/rails db:migrate```Rails 会执行迁移命令并告诉我们它创建了 Articles 表

## Active Record(模型)
Active Record 是 MVC 中的 M（模型），负责处理数据和业务逻辑.是一种对象关系映射(ORM)系统

### 命名约定
数据库表名: 下划线分割,eg:line_items
模型类名: 每个单词首字母大写,eg: LineItem

### 覆盖命名约定
```self.table_name = "my_product"```
```set_fixture_class my_products: Product```
```fixtures :my_product```
使用 ActiveRecord::Base.primary_key= 方法指定表的主键
```self.primary_key = "product_id"```

## CRUD
### 创建
**create()**
调用 create 方法会创建一个新记录，并将其存入数据库
```js
user = User.create(name: "David", occupation: "Code Artist")
```
new 方法实例化一个新对象，但不保存
```js
user = User.new
user.name = "David"
user.occupation = "Code Artist"
```
调用 ```user.save``` 可以把记录存入数据库

## 读取
### all 方法
**返回所有用户组成的集合**
```users = User.all```

### first 方法
**返回第一个用户**
```user = User.first```

### find_by 方法
**返回第一个名为 David 的用户**
```david = User.find_by(name: 'David')```

### where 方法和 order 方法
**查找所有名为 David，职业为 Code Artists 的用户，而且按照 created_at 反向排列**
```users = User.where(name: 'David', occupation: 'Code Artist').order(created_at: :desc)```

## 更新

**find_by() 根据条件查询**
**save 保存到数据库**
```js
user = User.find_by(name: 'David')
user.name = 'Dave'
user.save
```

### update
**使用散列的简写方式，指定属性名和属性值**
```js
user = User.find_by(name: 'David')
user.update(name: 'Dave')
```

### update_all
```User.update_all "max_login_attempts = 3, must_change_password = 'true'"```

## 删除
### destroy
```js
user = User.find_by(name: 'David')
user.destroy
```

## 数据验证

### save! 与 update!
```js
class User < ApplicationRecord
  validates :name, presence: true
end
 
user = User.new
user.save
=> false
user.save!
=> ActiveRecord::RecordInvalid: Validation failed: Name can't be blank
```

## 迁移
迁移是 Active Record 的一个特性，允许我们按时间顺序管理数据库模式。有了迁移，就不必再用纯 SQL 来修改数据库模式，而是可以使用简单的 Ruby DSL 来描述对数据表的修改
Rails 提供了一个 DSL 用来处理数据库模式,叫做"迁移"
Rails 会跟踪哪些迁移已经应用到数据库上，还提供了回滚功能

```在这个迁移运行之前，数据表还不存在。在这个迁移运行之后，数据表就被创建了```
### 创建表
```rails db:migrate```

### 回滚
```rails db:rollback```

### 创建迁移
迁移文件储存在 db/migrate 文件夹中，一个迁移文件包含一个迁移类

```bin/rails generate migration AddPartNumberToProducts```
生成迁移文件
```js
class AddPartNumberToProducts < ActiveRecord::Migration[5.0]
  def change
  end
end
```

如果迁移名称是 ```AddXXXToYYY``` 或 ```RemoveXXXFromYYY``` 的形式,并且后面跟着字段名和类型列表,那么会生成包含合适的 add_column 或 remove_column 语句的迁移

```bin/rails generate migration AddPartNumberToProducts part_number:string```
生成迁移文件
```js
class AddPartNumberToProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :part_number, :string
  end
end
```

如果迁移名称是 ```CreateXXX``` 的形式，并且后面跟着字段名和类型列表，那么会生成用于创建包含指定字段的 XXX 数据表的迁移
```bin/rails generate migration CreateProducts name:string part_number:string```
```js
class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :part_number
    end
  end
end
```

### 创建数据表
**create_table**
```bin/rails generate model Product name:string description:text```
```js
class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
 
      t.timestamps
    end
  end
end
```

### 创建联结数据表
**create_join_table**
```create_join_table :products, :categories```

### 修改数据表
change_table方法 用于修改现有的数据表
```js
change_table :products do |t|
  t.remove :description, :name
  t.string :part_number
  t.index :part_number
  t.rename :upccode, :upc_code
end
```
上面的代码删除 description 和 name 字段，创建 part_number 字符串字段并添加索引，最后重命名 upccode 字段

### 修改字段
change_column
```change_column :products, :part_number, :text```
把 products 数据表的 part_number 字段修改为 :text 字段
**change_column 命令是无法撤销的**

### 字段修饰符
- limit 修饰符：设置 string/text/binary/integer 字段的最大长度
- precision 修饰符：定义 decimal 字段的精度，表示数字的总位数
- scale 修饰符：定义 decimal 字段的标度，表示小数点后的位数
- polymorphic 修饰符：为 belongs_to 关联添加 type 字段
- null 修饰符：设置字段能否为 NULL 值
- default 修饰符：设置字段的默认值
- index 修饰符：为字段添加索引
- comment 修饰符：为字段添加注释

# 数据验证
### 爆炸方法
爆炸方法（例如 save!）会在验证失败后抛出异常

### valid? 和 invalid?
valid? 方法会触发数据验证，如果对象上没有错误，返回 true，否则返回 false
invalid? 的作用与 valid? 相反，它会触发数据验证，如果找到错误就返回 true，否则返回 false
Active Record 执行验证后，所有发现的错误都可以通过实例方法 errors.messages 获取

### errors[]
检查对象的某个属性是否有效，可以使用 errors[:attribute]

### errors.details
查看是哪个验证导致属性无效的，可以使用 errors.details[:attribute]

## 数据验证辅助方法

### acceptance
检查表单提交时，用户界面中的复选框是否被选中
```js
class Person < ApplicationRecord
  validates :terms_of_service, acceptance: true
end
```
仅当 terms_of_service 不为 nil 时才会执行这个检查,这个辅助方法的默认错误消息是“must be accepted”。通过 message 选项可以传入自定义的消息

```js
class Person < ApplicationRecord
  validates :terms_of_service, acceptance: { message: 'must be abided' }
end
```

### validates_associated
如果模型和其他模型有关联，而且关联的模型也要验证，要使用这个辅助方法
```js
class Library < ApplicationRecord
  has_many :books
  validates_associated :books
end
```

### confirmation
检查两个文本字段的值是否完全相同,例如，确认电子邮件地址或密码。这个验证创建一个虚拟属性，其名字为要验证的属性名后加 _confirmation
```js
class Person < ApplicationRecord
  validates :email, confirmation: true
  validates :email_confirmation, presence: true
end
```
视图模板
```js
<%= text_field :person, :email %>
<%= text_field :person, :email_confirmation %>
```

```:case_sensitive``` 选项指定确认时是否区分大小写

### exclusion
检查属性的值是否不在指定的集合中

### format
检查属性的值是否匹配 :with 选项指定的正则表达式
```js
class Product < ApplicationRecord
  validates :legacy_code, format: { with: /\A[a-zA-Z]+\z/,
    message: "only allows letters" }
end
```
使用 :without 选项，指定属性的值不能匹配正则表达式

### inclusion
检查属性的值是否在指定的集合中

### length
验证属性值的长度
```js
class Person < ApplicationRecord
  validates :name, length: { minimum: 2 }
  validates :bio, length: { maximum: 500 }
  validates :password, length: { in: 6..20 }
  validates :registration_number, length: { is: 6 }
end
```
可用的长度约束选项有：
- :minimum
- :maximum
- :in（或 :within)
- :is

### numericality
检查属性的值是否只包含数字,默认情况下，匹配的值是可选的正负符号后加整数或浮点数。如果只接受整数，把 :only_integer 选项设为 true
```js
class Player < ApplicationRecord
  validates :points, numericality: true
  validates :games_played, numericality: { only_integer: true }
end
```
可指定以下选项:
- :greater_than：属性值必须比指定的值大
- :greater_than_or_equal_to：属性值必须大于或等于指定的值
- :equal_to：属性值必须等于指定的值
- :less_than：属性值必须比指定的值小
- :less_than_or_equal_to：属性值必须小于或等于指定的值
- :other_than：属性值必须与指定的值不同
- :odd：如果设为 true，属性值必须是奇数
- :even：如果设为 true，属性值必须是偶数

### presence
检查指定的属性是否为非空值
 ```blank?```方法检查值是否为 nil 或空字符串

### absence
验证指定的属性值是否为空

### uniqueness
在保存对象之前验证属性值是否是唯一的

### validates_with
把记录交给其他类做验证

## 常用的验证选项
### :allow_nil
指定 :allow_nil 选项后，如果要验证的值为 nil 就跳过验证

### :allow_blank
:allow_blank 选项和 :allow_nil 选项类似。如果要验证的值为空（调用 blank? 方法判断，例如 nil 或空字符串），就跳过验证

### :message
如果验证失败，会把 :message 选项指定的字符串添加到 errors 集合中

### :on
:on 选项指定什么时候验证
on: :create   指定只在创建记录时验证

## 严格验证
## 条件验证
## 自定义验证
自定义的验证类继承自 ActiveModel::Validator，必须实现 validate 方法，其参数是要验证的记录，然后验证这个记录是否有效。自定义的验证类通过 validates_with 方法调用

```js
class MyValidator < ActiveModel::Validator
  def validate(record)
    unless record.name.starts_with? 'X'
      record.errors[:name] << 'Need a name starting with X please!'
    end
  end
end
 
class Person
  include ActiveModel::Validations
  validates_with MyValidator
end
```
## 处理验证错误

## 在视图中显示验证错误

**errors.full_messages**显示错误消息
```js
<% if @article.errors.any? %>
  <div id="error_explanation">
    <h2><%= pluralize(@article.errors.count, "error") %> prohibited this article from being saved:</h2>
 
    <ul>
    <% @article.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
    </ul>
  </div>
<% end %>
```
如果使用 Rails 的表单辅助方法生成表单，如果某个表单字段验证失败，会把字段包含在一个 <div> 中
```js
<div class="field_with_errors">
  <input id="article_title" name="article[title]" size="30" type="text" value="">
</div>
```

## 关联
```js
class Author < ApplicationRecord
  has_many :books, dependent: :destroy
end
 
class Book < ApplicationRecord
  belongs_to :author
end
```
为某位作者添加新书
```js
@book = @author.books.create(published_at: Time.now)
```
删除作者及其所有图书
```js
@author.destroy
```
## 关联的类型
- belongs_to                      创建两个模型之间一对一的关系,声明所在的模型实例```属于```另一个模型的实例
- has_one                         建立两个模型之间的一对一关系,这种关联表示模型的实例```包含或拥有```另一个模型的实例
- has_many                        建立两个模型之间的一对多关系
- has_many :through               建立两个模型之间的多对多关联,可以借由第三个模型
- has_one :through                建立两个模型之间的一对一关系,这种关联表示一个模型```通过第三个模型拥有```另一模型的实例
- has_and_belongs_to_many         建立两个模型之间的多对多关系，不借由第三个模型

## 从数据库中检索对象
### 检索单个对象
**find 方法**
find 方法检索指定主键对应的对象，指定主键时可以使用多个选项
```js
// 查找主键（ID）为 10 的客户
client = Client.find(10)
```
等效于
```SELECT * FROM clients WHERE (clients.id = 10) LIMIT 1```

**take 方法**
take 方法检索一条记录而不考虑排序
```client = Client.take```
等效于
```SELECT * FROM clients LIMIT 1```

**first 方法**
first 方法默认查找按主键排序的第一条记录
```client = Client.first```
等效于
```SELECT * FROM clients ORDER BY clients.id ASC LIMIT 1```

**last 方法**
last 方法默认查找按主键排序的最后一条记录
```client = Client.last```
等效于
```SELECT * FROM clients ORDER BY clients.id DESC LIMIT 1```

**find_by 方法**
find_by 方法查找匹配指定条件的第一条记录
```Client.find_by first_name: 'Lifo'```
等效于
```SELECT * FROM clients WHERE (clients.first_name = 'Lifo') LIMIT 1```

### 批量检索多个对象

**find_each 方法**
find_each 方法批量检索记录，然后逐一把每条记录作为模型传入块

**find_in_batches方法**
find_in_batches 方法和 find_each 方法类似，两者都是批量检索记录
区别在于，```find_in_batches``` 方法会把```一批记录```作为模型数组传入块，而不是像 ```find_each``` 方法那样```逐一```把每条记录作为模型传入块

## 条件查询
where 方法用于指明限制返回记录所使用的条件

### 纯字符串条件
```Client.where("orders_count = '2'")```

### 数组条件
使用其他参数来替换条件字符串中的问号
```Client.where("orders_count = ? AND locked = ?", params[:orders], false)```

### 散列条件
**相等性条件**
```Client.where(locked: true)```

**范围条件**
```Client.where(created_at: (Time.now.midnight - 1.day)..Time.now.midnight)```

**子集条件**
使用IN 表达式来查找记录
```Client.where(orders_count: [1,3,5])```
等效于
```SELECT * FROM clients WHERE (clients.orders_count IN (1,3,5))```

### NOT 条件
```Client.where.not(locked: true)```
等效于
```SELECT * FROM clients WHERE (clients.locked != 1)```

## 排序
### 升序
```Client.order(:created_at)```
```Client.order("created_at")```
```Client.order(created_at: :asc)```
```Client.order("created_at ASC")```

### 降序
```Client.order(created_at: :desc)```
```Client.order("created_at DESC")```

## 选择特定字段
```Client.select("viewable_by, locked")```
等效于
```SELECT viewable_by, locked FROM clients```

### distinct
使用 distinct 方法添加唯一性约束
```Client.select(:name).distinct```
等效于
```SELECT DISTINCT name FROM clients```

## 限量和偏移量
```Client.limit(5).offset(30)```
等效于
<!-- 从第 31 条记录开始的 5 条记录 -->
```SELECT * FROM clients LIMIT 5 OFFSET 30```

## 分组
```Order.select("date(created_at) as ordered_date, sum(price) as total_price").group("date(created_at)")```
等效于
```js
SELECT date(created_at) as ordered_date, sum(price) as total_price
FROM orders
GROUP BY date(created_at)
```

### 分组项目的总数
```Order.group(:status).count```
等效于
```js
SELECT COUNT (*) AS count_all, status AS status
FROM "orders"
GROUP BY status
```

## having 方法
SQL 语句用 HAVING 子句指明 GROUP BY 字段的约束条件
```Order.select("date(created_at) as ordered_date, sum(price) as total_price").group("date(created_at)").having("sum(price) > ?", 100)```
等效于
```js
SELECT date(created_at) as ordered_date, sum(price) as total_price
FROM orders
GROUP BY date(created_at)
HAVING sum(price) > 100
```

## 条件覆盖
### unscope 方法
使用 unscope 方法删除某些条件

### only 方法
使用 only 方法覆盖某些条件

### reorder 方法
使用 reorder 方法覆盖默认作用域中的排序方式

### reverse_order 方法
使用 reverse_order 方法反转排序条件

### rewhere 方法
使用 rewhere 方法覆盖 where 方法中指定的条件

# 视图
## render 方法
### 渲染同个控制器的其他模板
如果想渲染同个控制器中的其他模板，可以把视图的名字传给 render 方法 
```js
def update
  @book = Book.find(params[:id])
  if @book.update(book_params)
    redirect_to(@book)
  else
    render "edit"
  end
end
```
如果调用 update 失败，update 动作会渲染同个控制器中的 edit.html.erb 模板
```render "edit"```
等效
```render :edit```

### 渲染其他控制器中某个动作的模板
```render "products/show"```

### 渲染任意文件
```:file``` 选项的值是绝对文件系统路径
```render file: "/u/apps/warehouse_app/current/app/views/products/show"```

### 渲染文本
```:plain``` 选项,可以把没有标记语言的纯文本发给浏览器
```render plain: "OK"```

### 渲染 HTML
```:html``` 选项，可以把 HTML 字符串发给浏览器
```render html: "<strong>Not Found</strong>".html_safe```

### 渲染 JSON
```render json: @product```
### 渲染 XML
```render xml: @product```
### 渲染普通的 JavaScript
```render js: "alert('Hello Rails');"```
### 渲染 JSON
```render json: @product```
### render 方法的选项
- :content_type
- :layout
- :location
- :status
- :formats

## redirect_to 方法
```redirect_to photos_url```
### redirect_back
把用户带回他们之前所在的页面

### 设置不同的重定向状态码

```redirect_to photos_path, status: 301```

## yield
yield 标明一个区域，渲染的视图会插入这里
```js
<html>
  <head>
  <%= yield :head %>
  </head>
  <body>
  <%= yield %>
  </body>
</html>
```
## content_for
content_for 方法在布局的具名 yield 区域插入内容
```js
<% content_for :head do %>
  <title>A simple page</title>
<% end %>
 
<p>Hello, Rails!</p>
```

```js
<html>
  <head>
  <title>A simple page</title>
  </head>
  <body>
  <p>Hello, Rails!</p>
  </body>
</html>
```

## 使用局部视图
```<%= render "menu" %>```
渲染这个视图时，会渲染名为 _menu.html.erb 的文件。注意文件名开头有个下划线

# Controller
## 健壮参数
### 允许使用的标量值
允许传入 :id
```params.permit(:id)```