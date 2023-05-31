import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import RenderPasswordsList from './components/index'
import './App.css'

class App extends Component {
  state = {
    passwordsList: [],
    username: '',
    password: '',
    siteName: '',
    showPasswords: false,
    searchedFor: '',
    updatedList: [],
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {username, password, siteName} = this.state
    this.setState(prevState => ({
      passwordsList: [
        ...prevState.passwordsList,
        {id: uuidv4(), username, password, siteName},
      ],
    }))
    this.updatingList()
  }

  updatingList = () => {
    this.setState(prevState => ({
      username: '',
      password: '',
      siteName: '',
      updatedList: prevState.passwordsList,
    }))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSiteName = event => {
    this.setState({siteName: event.target.value})
  }

  getEmptyPage = () => (
    <>
      <img
        alt="no passwords"
        className="no-passwords"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
      />
      <p className="no-password">No Passwords</p>
    </>
  )

  onDeleteFunction = id => {
    const {passwordsList} = this.state

    const filteredList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredList, updatedList: filteredList})
  }

  getPasswordsList = () => {
    const {updatedList, showPasswords} = this.state

    return (
      <ul className="password-list">
        {updatedList.map(each => (
          <RenderPasswordsList
            eachDetails={each}
            key={each.id}
            showPasswords={showPasswords}
            onDeleteFunction={this.onDeleteFunction}
          />
        ))}
      </ul>
    )
  }

  showHidePasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  searchFunctionality = event => {
    const searchingSite = event.target.value
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each =>
      each.siteName.toLowerCase().includes(searchingSite.toLowerCase()),
    )
    this.setState({updatedList: filteredList, searchedFor: searchingSite})
  }

  render() {
    const {
      showPasswords,
      username,
      password,
      siteName,
      searchedFor,
      updatedList,
    } = this.state

    const listLength = updatedList.length
    const emptyList = updatedList.length === 0
    return (
      <div className="bg-cont">
        <div className="card">
          <img
            className="logo"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
          <div className="password-manager">
            <img
              className="sm-device"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <form className="form-style" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="site-name">
                <img
                  alt="website"
                  className="globe"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <hr className="line-separator" />
                <input
                  value={siteName}
                  placeholder="Enter Website"
                  className="input-style"
                  onChange={this.onChangeSiteName}
                />
              </div>
              <div className="site-name">
                <img
                  alt="username"
                  className="globe"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <hr className="line-separator" />
                <input
                  value={username}
                  placeholder="Enter Username"
                  className="input-style"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="site-name">
                <img
                  alt="password"
                  className="globe"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <hr className="line-separator" />
                <input
                  value={password}
                  type="password"
                  placeholder="Enter Password"
                  className="input-style"
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              className="bg-device-img"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>
          <div className="passwords-lists-cont">
            <div className="card-2">
              <div className="length-search">
                <div className="card2-heading">
                  <h1 className="card2-heading">Your Passwords</h1>
                  <p className="list-length">{listLength}</p>
                </div>
                <div className="search-cont">
                  <img
                    alt="search"
                    className="search-icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  />
                  <hr className="line-separator" />
                  <input
                    placeholder="Search"
                    type="search"
                    className="search-bar"
                    value={searchedFor}
                    onChange={this.searchFunctionality}
                  />
                </div>
              </div>
              <hr className="hori-line-separator" />
              <div className="show-passwords-cont">
                <input
                  className="check-box"
                  type="checkbox"
                  id="showPasswords"
                  onClick={this.showHidePasswords}
                  checked={showPasswords}
                />
                <label className="label-style" htmlFor="showPasswords">
                  Show passwords
                </label>
              </div>
              {emptyList ? this.getEmptyPage() : this.getPasswordsList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
