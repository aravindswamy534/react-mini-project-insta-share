import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMSg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    console.log(this.props)
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onGetUsername = event => {
    this.setState({username: event.target.value})
  }

  onGetPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-image">
          <img
            src="https://res.cloudinary.com/aravindswamy534/image/upload/v1643547907/react%20insta%20share/OBJECTS_cpvxmb.png"
            alt="website login"
          />
        </div>
        <form className="form-login" onSubmit={this.onSubmitLoginForm}>
          <div>
            <img
              className="insta-icon"
              alt="website logo"
              src="https://res.cloudinary.com/aravindswamy534/image/upload/v1643547907/react%20insta%20share/Standard_Collection_8_mm8tng.png"
            />
            <h1 className="insta-share-heading">Insta Share</h1>
          </div>
          <div className="user-filed-container">
            <div>
              <label className="insta-share-username" htmlFor="username">
                USERNAME
              </label>
              <br />
              <input
                className="insta-share-input-username"
                type="text"
                id="username"
                value={username}
                onChange={this.onGetUsername}
                placeholder="username"
              />
            </div>
            <div>
              <label className="insta-share-password" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                className="insta-share-input-password"
                type="password"
                onChange={this.onGetPassword}
                placeholder="password"
                id="password"
                value={password}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </div>
        </form>
      </>
    )
  }
}

export default LoginForm
