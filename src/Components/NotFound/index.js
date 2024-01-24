import './index.css'

const NotFound = () => {
  console.log()
  return (
    <div className="not-found-container">
      <img
        className="not-found-image"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-header">Page Not Found</h1>

      <p className="not-found-para">
        {/* eslint-disable-next-line */}
        we're sorry, the page you requested could not be found
      </p>
    </div>
  )
}

export default NotFound
