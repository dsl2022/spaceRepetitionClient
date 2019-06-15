import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginRoute.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    console.log(location,history,'location history test')
    const destination = (location.state || {}).from || '/'
    console.log(destination,'test destination')
    history.push(destination)
  }

  render() {
    return (
      <section className='login__container'>
        <div className='login_title'>
          <h2>Login</h2>
          </div>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
