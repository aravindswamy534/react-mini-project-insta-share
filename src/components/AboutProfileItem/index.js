import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileDetailedView from '../ProfileDetailedView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutProfileItem extends Component {
  state = {data: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchUserDetails()
  }

  fetchUserDetails = async props => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.user_details)
      const updatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts.map(each1 => ({
          id: each1.id,
          image: each1.image,
        })),
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories.map(each2 => ({
          id: each2.id,
          image: each2.image,
        })),
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }
      this.setState({data: updatedData, apiStatus: apiStatusConstants.success})
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryProfileView = () => {
    this.fetchUserDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onGetProfileFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/aravindswamy534/image/upload/v1643700830/react%20insta%20share/Group_7522_jknzy8.png"
        alt="failure view"
      />
      <button onClick={this.retryProfileView} type="button">
        Try again
      </button>
      <p>Something went wrong. Please try again</p>
    </div>
  )

  onRenderSuccessView = () => {
    const {data} = this.state
    return <ProfileDetailedView each={data} />
  }

  renderDisplayedUserDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onRenderSuccessView()
      case apiStatusConstants.failure:
        return this.onGetProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {data} = this.state
    return (
      <div>
        <Header />
        {this.renderDisplayedUserDetails()}
      </div>
    )
  }
}

export default AboutProfileItem
