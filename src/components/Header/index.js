import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {RiCloseCircleFill} from 'react-icons/ri'
import {IoIosMenu} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {
    menu: false,
    searching: false,
  }

  activeRoute = () => {
    const {match} = this.props
    return match.path
  }

  onClickSearch = () => {
    if (this.activeRoute() === '/') {
      this.setState(prevState => ({
        searching: !prevState.searching,
      }))
    }
  }

  LogoutClicked = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  onClickHamburgerMenu = () => {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }

  onChangeSearch = event => {
    const {updatedSearch} = this.props
    updatedSearch(event.target.value)
  }

  onClickSearchButton = () => {
    const {getSearchResults} = this.props
    getSearchResults()
  }

  render() {
    const {menu, searching} = this.state
    const {searchQuery} = this.props
    return (
      <nav className="nav-bar">
        <div className="nav-content-container">
          <div className="nav-container">
            <Link to="/" className="logo-title-container">
              <img
                className="nav-logo"
                alt="website logo"
                src="https://res.cloudinary.com/srk999/image/upload/v1656652770/mobile/Standard_Collection_8_1_cj0cmm.svg"
              />
              <h1 className="nav-title">Insta Share</h1>
            </Link>
            <button
              className="hamburger-menu"
              type="button"
              onClick={this.onClickHamburgerMenu}
            >
              <IoIosMenu size="2em" />
            </button>
          </div>

          {menu && (
            <div className="menu-sm">
              <ul className="unordered-list-in-nav">
                <li>
                  <Link
                    className={`li-item ${
                      this.activeRoute() === '/' && !searching && 'active'
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    className={`li-item-search ${searching && 'active'}`}
                    type="button"
                    onClick={this.onClickSearch}
                  >
                    Search
                  </button>
                </li>
                <li>
                  <Link
                    to="/my-profile"
                    className={`li-item ${
                      this.activeRoute() === '/my-profile' && 'active'
                    }`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="logout-button"
                    type="button"
                    onClick={this.LogoutClicked}
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button type="button" onClick={this.onClickHamburgerMenu}>
                    <RiCloseCircleFill className="close-icon" />
                  </button>
                </li>
              </ul>
            </div>
          )}

          {searching && (
            <div className="nav-search-input-container">
              <input
                className="nav-search-input"
                type="search"
                placeholder="Search Caption"
                value={searchQuery}
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                className="search-logo"
                onClick={this.onClickSearchButton}
                testid="searchIcon"
              >
                <FaSearch testid="searchIcon" />
              </button>
            </div>
          )}

          <div className="lg-nav-container">
            <Link to="/" className="logo-title-container">
              <img
                className="nav-logo"
                alt="website logo"
                src="https://res.cloudinary.com/srk999/image/upload/v1656652770/mobile/Standard_Collection_8_1_cj0cmm.svg"
              />
              <h1 className="nav-title">Insta Share</h1>
            </Link>
            <ul className="lg-nav-content-container">
              <li>
                <input
                  className="nav-search-input"
                  type="search"
                  placeholder="Search Caption"
                  value={searchQuery}
                  onChange={this.onChangeSearch}
                />
                <button
                  className="search-icon-button"
                  type="button"
                  onClick={this.onClickSearchButton}
                >
                  <FaSearch />
                </button>
              </li>
              <li>
                <Link
                  className={`li-item ${
                    this.activeRoute() === '/' && 'active'
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`li-item ${
                    this.activeRoute() === '/my-profile' && 'active'
                  }`}
                  to="/my-profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="logout-button"
                  type="button"
                  onClick={this.LogoutClicked}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
