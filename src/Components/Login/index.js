import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userObject = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userObject),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)

    if (response.ok) {
      const token = await response.json()
      const {jwtToken} = {jwtToken: token.jwt_token}
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      history.replace('/')
    } else {
      const res = await response.json()
      const {errorMsg} = {errorMsg: res.error_msg}

      this.setState({errorMsg})
    }
  }

  userName = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-container">
        <form onSubmit={this.submitForm} className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-login"
          />

          <label htmlFor="username">USERNAME</label>
          <input
            value={username}
            onChange={this.userName}
            placeholder="Username"
            type="text"
            id="username"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            value={password}
            onChange={this.password}
            placeholder="Password"
            type="password"
            id="password"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
