 1. 问题描述：
	FORM表单只有一个input的情况下，按回车会刷新页面
 - iView 版本号
	^3.4.1
- 操作系统/浏览器 版本号
	Ubuntu16.04/Chrome 61
	window/Chrome 61
- Vue 版本号
	^2.6.10
```javascript
<template>
  <Form
    ref="search-form"
    :model="searchModel"
  >
    <Row
      style="margin: 25px 0 0"
      type="flex"
      justify="end"
    >
      <Col span="5">
        <FormItem prop="name">
          <Input
            v-model="searchModel.name"
            type="text"
            @on-enter="handleSubmit"
          />
        </FormItem>
      </Col>
      <Col span="1">
        <FormItem>
          <Button
            icon="ios-search"
            @click="handleSubmit"
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      searchModel: {
        name: ''
      }
    }
  },
  methods: {
    handleSubmit () {
   	  console.log(this.searchModel)
    }
  }
}
</script>
```
2. 期待结果：
      点击回车之后，页面不刷新，进行过滤搜索
3. 问题原因：
      触发了 form 表单默认事件
4. 解决办法：
```javascript
<Form @submit.native.prevent>
// or
<Form onsubmit="return false;">
```
