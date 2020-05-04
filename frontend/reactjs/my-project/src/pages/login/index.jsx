import React  from 'react'
import { injectIntl } from 'react-intl'
import LoginForm from '@/components/login-form'

function LoginPage(props) {
  const { intl, history } = props

  return (
    <div className='login-wrapper'>
      <div className="logo-name">My Project</div>
      <LoginForm intl={intl} history={history}/>
    </div>
  )
}

export default injectIntl(LoginPage)
