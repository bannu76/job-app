import {Link, withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  console.log()

  return (
    <div>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilites and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default withRouter(Home)
