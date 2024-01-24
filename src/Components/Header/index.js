import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  console.log()
  const removeCookie = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="website-logo-container">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="header-tabs">
        <li className="header-list">
          <Link to="/" className="link-decor">
            Home
          </Link>
        </li>
        <li className="header-list">
          <Link to="/jobs" className="link-decor">
            Jobs
          </Link>
        </li>
      </ul>
      <button onClick={removeCookie} type="button" className="logout-button">
        Logout
      </button>
      <ul className="header-tabs-sm">
        <li className="sm-li">
          <Link to="/" className="sm-link">
            <MdHome />
          </Link>
        </li>
        <li className="sm-li">
          <Link to="/jobs" className="sm-link">
            <BsFillBriefcaseFill />
          </Link>
        </li>
        <li className="sm-li">
          {/* eslint-disable-next-line */}
          <button
            onClick={removeCookie}
            type="button"
            className="sm-logout-button"
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
