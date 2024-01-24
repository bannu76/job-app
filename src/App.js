import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import JobDetails from './Components/JobDetails'
import Jobs from './Components/Jobs'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFound from './Components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
// eslint-disable-next-line
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
// eslint-disable-next-line
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

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
