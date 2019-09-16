import React from 'react'
import Storage from '@/utils/storage'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const loginOut = () => {
  Storage.removeItem('token')
}

const logoNameMenu = (
  <Menu>
    <Menu.Item>
      <Link to='/login' onClick={loginOut}>退出登录</Link>
    </Menu.Item>
  </Menu>
)

export const DefaultLayout = ({component: Component, ...rest}) => {
  const collapsed = rest.toggleState
  const toggle = rest.toggleMethod

  return (
    <Route {...rest} render={matchProps => (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme='light'
        >
          <div className={collapsed ? "logo logo-sm" : "logo"} />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="sub1" title={<span><Icon type="windows" theme="filled" /><span>患者列表</span></span>}>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} className='header'>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />
            <Dropdown overlay={logoNameMenu} placement='bottomCenter'>
              <Avatar className='logo-name'>Li</Avatar>
            </Dropdown>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 600,
          }}
          >
            <Component {...matchProps} />
          </Content>
        </Layout>
      </Layout>
    )} />
  )
}
