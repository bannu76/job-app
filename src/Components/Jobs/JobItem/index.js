import {IoLocationSharp} from 'react-icons/io5'
import {IoIosStar} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {item, altValue} = props

  return (
    <li className="job-li">
      <Link to={`/jobs/${item.id}`} className="link-decor">
        <div className="one">
          <img
            className="job-item-image"
            src={item.companyLogoUrl}
            alt={altValue}
          />
          <div className="inside-one-half">
            <h1 className="title">{item.title}</h1>
            <div className="inside-one">
              <IoIosStar className="star" />
              <p>{item.rating}</p>
            </div>
          </div>
        </div>
        <div className="one-down">
          <IoLocationSharp />
          <p className="location">{item.location}</p>
          <BsBriefcaseFill />
          <p className="job-type">{item.employmentType}</p>

          <p>{item.packagePerAnum}</p>
        </div>
        <hr className="horizontal-li" />
        <h1 className="description">description</h1>
        <p>{item.jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
