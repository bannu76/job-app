import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import JobDetailsItem from './JobDetailsItem'
import JobItem from '../Jobs/JobItem'
import './index.css'

const apiUrl = {
  SUCCESS: 'success',
  FAIL: 'fail',
  LOADING: 'loading',
}

class JobDetails extends Component {
  state = {similarJobs: [], apiStatus: apiUrl.LOADING, jDetails: {}}

  componentDidMount() {
    this.getData()
  }

  caseChange = item => ({
    companyLogoUrl: item.company_logo_url,
    companyWebsiteUrl: item.company_website_url,
    employmentType: item.employment_type,
    id: item.id,
    jobDescription: item.job_description,
    liftAtCompany: {
      description: item.life_at_company.description,
      imageUrl: item.life_at_company.image_url,
    },
    location: item.location,
    packagePerAnum: item.package_per_annum,
    rating: item.rating,
    skills: item.skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    })),
    title: item.title,
  })

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const optionss = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(url, optionss)
    if (response.ok) {
      const res = await response.json()
      const {jobDetailObj, similarJobList} = {
        jobDetailObj: res.job_details,
        similarJobList: res.similar_jobs,
      }
      const updateJobDetails = this.caseChange(jobDetailObj)
      const updatedSimilarJobs = similarJobList.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))

      this.setState({
        jDetails: updateJobDetails,
        apiStatus: apiUrl.SUCCESS,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiUrl.FAIL})
    }
  }

  renderJobDetailsFail = () => (
    <div className='job-fail-container'>
      <img
        className='job-fail-image'
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1 className='job-fail-heading'>Oops! Something Went Wrong</h1>
      <p className='job-fail-para'>
        We cannot seem to find the page you are looking for
      </p>
      <button type='button' onClick={this.getData} className='retry-button'>
        Retry
      </button>
    </div>
  )

  renderJobDetailsLoading = () => (
    <div
      className='loader-container profile-container-fail'
      data-testid='loader'
    >
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderJobDetails = () => {
    const {jDetails, similarJobs} = this.state
    console.log(similarJobs)

    return (
      <div className='job-details-container'>
        <JobDetailsItem item={jDetails} />
        <h1>Similar Jobs</h1>
        <ul className='similar-jobs-ul'>
          {similarJobs.map(item => (
            <JobItem
              key={item.id}
              item={item}
              altValue='similar job company logo'
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiUrl.SUCCESS:
        return this.renderJobDetails()
      case apiUrl.FAIL:
        return this.renderJobDetailsFail()
      case apiUrl.LOADING:
        return this.renderJobDetailsLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <div className='job-details-bg-container'>
        <Header />
        {this.renderJobDetailsAll()}
      </div>
    )
  }
}
export default JobDetails
