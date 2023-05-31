import './index.css'

const RenderPasswordsList = props => {
  const {eachDetails, onDeleteFunction, showPasswords} = props
  const {id, siteName, username, password} = eachDetails
  const clickToDeleteRequest = () => {
    onDeleteFunction(id)
  }
  let count = 2
  console.log(count)
  let classNameFix
  if (count % 2 === 0) {
    classNameFix = 'first'
    count += 1
  } else if (count % 3 === 0) {
    classNameFix = 'three'
    count += 1
  } else if (count % 4 === 0) {
    classNameFix = 'four'
    count += 1
  } else if (count % 5 === 0) {
    classNameFix = 'five'
    count += 1
  } else {
    classNameFix = 'nothing'
    count += 1
  }

  return (
    <li className="each-password">
      <p className={`profile ${classNameFix}`}>{siteName[0].toUpperCase()}</p>
      <div className="details-cont">
        <p className="site">{siteName}</p>
        <p className="user">{username}</p>

        {showPasswords && <p className="password">{password}</p>}
        {!showPasswords && (
          <img
            className="stars"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          />
        )}
      </div>
      <button
        data-testid="delete"
        className="delete-btn"
        type="button"
        onClick={clickToDeleteRequest}
      >
        <img
          className="delete"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default RenderPasswordsList
