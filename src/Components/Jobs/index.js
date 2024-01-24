import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import JobItem from './JobItem'

import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profilApiUrl = {SUCCESS: 'success', FAIL: 'fail', LOADING: 'loading'}
const jobsApiUrl = {SUCCESS: 'success', FAIL: 'fail', LOADING: 'loading'}

class Jobs extends Component {
  state = {
    profileApiStatus: profilApiUrl.LOADING,
    jobApiStatus: jobsApiUrl.LOADING,
    profileData: {name: '', profileImage: '', shortBio: ''},
    empTypeCheckList: [],
    salary: '',
    searchText: '',
    searchFinalText: '',
    jobList: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobData()
  }

  onSearch = event => {
    this.setState({searchText: event.target.value})
  }

  getSearchedJobs = () => {
    const {searchText} = this.state

    this.setState({searchFinalText: searchText}, this.getJobData)
  }

  getJobData = async () => {
    const {empTypeCheckList, salary, searchFinalText} = this.state
    const emptype =
      empTypeCheckList.length !== 0 ? empTypeCheckList.join(',') : ''

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const fetchUrl = `https://apis.ccbp.in/jobs?employment_type=${emptype}&minimum_package=${salary}&search=${searchFinalText}`

    const response = await fetch(fetchUrl, options)
    if (response.ok) {
      const {jobs} = await response.json()
      const updatedCaseJobs = jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))

      this.setState({
        jobList: updatedCaseJobs,
        jobApiStatus: jobsApiUrl.SUCCESS,
      })
    } else {
      this.setState({jobApiStatus: jobsApiUrl.FAIL})
    }
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {empTypeCheckList} = this.state
    console.log(empTypeCheckList)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok) {
      const res = await response.json()
      const {profileDetails} = {profileDetails: res.profile_details}
      const profile = {
        name: profileDetails.name,
        profileImage: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileApiStatus: profilApiUrl.SUCCESS,
        profileData: profile,
      })
    } else {
      this.setState({profileApiStatus: profilApiUrl.FAIL})
    }
  }

  generateProfile = () => {
    const {profileData} = this.state

    return (
      <div className="profile-container">
        <img src={profileData.profileImage} alt={profileData.name} />
        <h1>{profileData.name}</h1>
        <p>{profileData.shortBio}</p>
      </div>
    )
  }

  ProfileLoading = () => (
    <div
      className="loader-container profile-container-fail"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  ProfileFail = () => (
    <div className="profile-container-fail">
      <button type="button" onClick={this.getData} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profilApiUrl.SUCCESS:
        return this.generateProfile()
      case profilApiUrl.FAIL:
        return this.ProfileFail()
      case profilApiUrl.LOADING:
        return this.ProfileLoading()
      default:
        return null
    }
  }

  changeCheckBox = event => {
    const {empTypeCheckList} = this.state
    const valu = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      this.setState(
        prevState => ({
          empTypeCheckList: [...prevState.empTypeCheckList, valu],
        }),
        this.getJobData,
      )
    } else {
      const filterdList = empTypeCheckList.filter(item => item !== valu)
      this.setState({empTypeCheckList: filterdList}, this.getJobData)
    }
  }

  renderCategory = () => (
    <div className="category-container">
      <h1>Type of Employment</h1>
      <ul className="category-list">
        {employmentTypesList.map(item => (
          <li className="emp-type-list" key={item.employmentTypeId}>
            <input
              onChange={this.changeCheckBox}
              id={item.employmentTypeId}
              className="emp-type-input"
              type="checkbox"
              value={item.employmentTypeId}
            />
            <label htmlFor={item.employmentTypeId}>{item.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  changeRadioBox = event => {
    this.setState({salary: event.target.value}, this.getJobData)
  }

  renderSalaryRange = () => (
    <div className="category-container">
      <h1>Salary Range</h1>
      <ul className="category-list">
        {salaryRangesList.map(item => (
          <li key={item.salaryRangeId} className="emp-type-list">
            <input
              onChange={this.changeRadioBox}
              id={item.salaryRangeId}
              className="emp-type-input"
              type="radio"
              value={item.salaryRangeId}
              name="salary"
            />
            <label htmlFor={item.salaryRangeId}>{item.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderJobs = () => {
    const {jobList} = this.state

    return (
      <ul className="job-ul">
        {jobList.map(item => (
          <JobItem key={item.id} item={item} altValue={'"company logo"'} />
        ))}
      </ul>
    )
  }

  renderJobFail = () => (
    <div className="job-fail-container">
      <img
        className="job-fail-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-fail-heading">Oops! Something Went Wrong</h1>
      <p className="job-fail-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobData} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobsLoading = () => (
    <div
      className="loader-container profile-container-fail"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFilterJobFail = () => (
    <div className="job-fail-container">
      <img
        className="job-fail-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="job-fail-heading">No Jobs Found</h1>
      <p className="job-fail-para">
        We could not find any jobs. Try other filters
      </p>
      <button type="button" onClick={this.getJobData} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobAll = () => {
    const {jobApiStatus, jobList} = this.state
    console.log(jobList)
    console.log(jobApiStatus)
    switch (jobApiStatus) {
      case jobsApiUrl.SUCCESS:
        if (jobList.length === 0) {
          return this.renderFilterJobFail()
        }
        return this.renderJobs()

      case jobsApiUrl.FAIL:
        return this.renderJobFail()
      case jobsApiUrl.LOADING:
        return this.renderJobsLoading()
      default:
        return null
    }
  }

  render() {
    const {searchText} = this.state

    return (
      <div>
        <Header />

        <div className="input-container-main">
          <div className="jobs-input-container">
            <input
              type="search"
              value={searchText}
              onChange={this.onSearch}
              placeholder="Search"
              className="input-search"
            />
            {/* eslint-disable-next-line */}
            <button
              type="button"
              data-testid="searchButton"
              onClick={this.getSearchedJobs}
              className="search-button"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>

        <div className="jobs-container">
          <div className="jobs-left-container">
            {this.renderProfile()}
            <hr className="horizontal" />
            {this.renderCategory()}
            <hr className="horizontal" />
            {this.renderSalaryRange()}
          </div>
          <div className="jobs-right-container">{this.renderJobAll()}</div>
        </div>
      </div>
    )
  }
}
export default Jobs
