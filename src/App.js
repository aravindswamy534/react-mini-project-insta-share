import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import AboutProfileItem from './components/AboutProfileItem'
// import AllJobs from './components/AllJobs'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={Profile} />
    {/*     
    <ProtectedRoute exact path="/jobs" component={AllJobs} /> */}

    <ProtectedRoute exact path="/users/:userId" component={AboutProfileItem} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="bad-path" />
  </Switch>
)

export default App
