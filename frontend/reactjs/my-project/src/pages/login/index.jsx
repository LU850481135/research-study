import React  from 'react'
import { injectIntl } from 'react-intl'
import LoginForm from '@/components/login-form'

function LoginPage(props) {
  const { intl } = props

  return (
    <div className='login-wrapper'>
      <div className="logo-name">My Project</div>
      <LoginForm intl={intl}/>
    </div>
  )
}

export default injectIntl(LoginPage)
