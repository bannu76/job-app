import {IoLocationSharp} from 'react-icons/io5'
import {IoIosStar} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import './index.css'

const JobDetailsItem = props => {
  const {item} = props
  const {liftAtCompany} = item
  console.log(item)
  return (
    <div className="job-details-container">
      <div>
        <div className="job-details-one">
          <img
            className="job-details-job-item-image"
            src={item.companyLogoUrl}
            alt="company logo"
          />
          <div className="job-details-inside-one-half">
            <h1 className="job-details-title">{item.title}</h1>
            <div className="job-details-inside-one">
              <IoIosStar className="job-details-star" />
              <p>{item.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-one-down">
          <div className="job-details-inside-one-down">
            <IoLocationSharp />
            <p className="job-details-location">{item.location}</p>
            <BsBriefcaseFill />
            <p className="job-details-job-type">{item.employmentType}</p>
          </div>
          <p>{item.packagePerAnum}</p>
        </div>
        <hr className="horizontal-li" />
        <div className="company-desc-visit">
          <p>description</p>

          <a href={item.companyWebsiteUrl}>
            Visit <FaExternalLinkAlt className="external link" />
          </a>
        </div>
        <p>{item.jobDescription}</p>
        <h1>Skills</h1>
        {item.skills !== undefined && (
          <ul className="job-details-ul">
            {item.skills.map(eachItem => (
              <li className="job-details-skill-li" key={eachItem.name}>
                <img
                  className="skill-image"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                />
                <p>{eachItem.name}</p>
              </li>
            ))}
          </ul>
        )}
        <h1>Life at Company</h1>
        {liftAtCompany !== undefined && (
          <div>
            <p>{liftAtCompany.description}</p>{' '}
            <img
              className="life-at-company-image"
              src={liftAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default JobDetailsItem
