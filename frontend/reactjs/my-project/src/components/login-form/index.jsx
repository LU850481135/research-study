import React from 'react'
import { Form, Input, Button, message } from 'antd'
import Storage from '@/utils/storage'
import UserApi from '@/api/users'

const LoginForm = Form.create({ name: 'login' })(
  function LoginForm (props) {
    const { intl, form, history } = props
    const { getFieldDecorator, validateFields } = form

    const handleSubmit = (e) => {
      e.preventDefault()
      validateFields((err, values) => {
        if (!err) {
          history.push('/home')
          // UserApi.login(values.username, values.password).then(async ({ data }) => {
          //   if (data.jwt) {
          //     Storage.setItem('token', data.jwt)
          //     await UserApi.userInfo().then(({data}) => {
          //       console.log('userInfo', data)
          //       Storage.setItem('currentUser', JSON.stringify(data))
          //     })
          //   }
          // }).catch((error) => {
          //   message.error(error.message)
          // })
        }
      })
    }

    return (
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: intl.formatMessage({id: 'login.form.username.error'})
            }],
          })(
            <Input
              placeholder={intl.formatMessage({id: 'login.form.username.placeholder'})}
              autoComplete='username'
              size='large'/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true,
            message: intl.formatMessage({id: 'login.form.password.error'})
            }],
          })(
            <Input
              type="password"
              autoComplete='pwd'
              placeholder={intl.formatMessage({id: 'login.form.password.placeholder'})}
              size='large'/>
          )}
        </Form.Item>
        <Form.Item className='login-btn'>
          <Button type="primary" htmlType="submit" block size='large'>
            {intl.formatMessage({id: 'login.form.login'})}
          </Button>
        </Form.Item>
      </Form>
    )
  }
)

export default LoginForm
