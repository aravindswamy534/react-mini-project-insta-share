import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {ImHome} from 'react-icons/im'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  state = {userEnteredText: ''}

  onClickLogout = props => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  userSearchedInput = event => {
    this.setState({userEnteredText: event.target.value})
  }

  onEnterSearchInput = event => {
    const {userEnteredSearchedValue} = this.props
    if (event.key === 'Enter') {
      const {userEnteredText} = this.state
      userEnteredSearchedValue(userEnteredText)
    }
    return null
  }

  render() {
    const {userEnteredText} = this.state
    return (
      <div className="nav-container">
        <ul className="header-ul-container">
          <li className="logo-container">
            <Link className="link" to="/">
              <img
                className="insta-icon"
                src="https://res.cloudinary.com/aravindswamy534/image/upload/v1643547907/react%20insta%20share/Standard_Collection_8_mm8tng.png"
                alt="website logo"
              />
              <h1 className="nav-heading">Insta Share</h1>
            </Link>
          </li>
          <li>
            <input
              placeholder="Search Caption"
              className="search-bar"
              type="search"
              onChange={this.userSearchedInput}
              onKeyDown={this.onEnterSearchInput}
              value={userEnteredText}
            />
            <FaSearch alt="searchIcon" />
          </li>
          <li className="home-jobs-container">
            <Link className="link" to="/">
              <ImHome className="home-icon" />
              <h1 className="nav-text">Home</h1>
            </Link>
            <Link className="link" to="/profile">
              <h1 className="nav-text">Profile</h1>
            </Link>
          </li>
          <li>
            <FiLogOut className="home-icon" onClick={this.onClickLogout} />
            <button
              type="button"
              className="btn-logout"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Header)
