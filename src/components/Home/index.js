import {Link, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {v4} from 'uuid'
import Header from '../Header'
import InstaStories from '../InstaStories'
import PostItem from '../PostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantsStories = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    data: [],
    apiStatus: apiStatusConstants.initial,
    instaStories: [],
    apiStatusStories: apiStatusConstantsStories.initial,
    searchInput: '',
    userLikedStatus: '',
  }

  componentDidMount() {
    this.renderSuccessViewPost()
    this.renderSuccessViewStories()
  }

  userEnteredSearchedValue = search => {
    this.setState({searchInput: search}, this.renderSuccessViewPost)
  }

  renderSuccessViewStories = async () => {
    this.setState({apiStatusStories: apiStatusConstantsStories.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(each4 => ({
        storyUrl: each4.story_url,
        userId: each4.user_id,
        userName: each4.user_name,
      }))
      this.setState({
        apiStatusStories: apiStatusConstantsStories.success,
        instaStories: updatedData,
      })
    } else {
      this.setState({apiStatusStories: apiStatusConstantsStories.failure})
    }
  }

  renderSuccessViewPost = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.posts.map(each => ({
        comments: each.comments.map(each2 => ({
          userName: each2.user_name,
          userId: each2.user_id,
          comment: each2.comment,
        })),
        createdAt: each.created_at,
        likesCount: each.likes_count,
        postDetailsCaption: each.post_details.caption,
        postDetailsImageUrl: each.post_details.image_url,
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
      }))
      this.setState({data: updateData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  userLikedDetails = (status, postId) => {
    this.setState({userLikedStatus: status})
    console.log(status)
    console.log(postId)
  }

  onRenderPostView = () => {
    const {data} = this.state

    return (
      <div>
        <div className="post-container">
          {data.map(each => (
            <PostItem
              userLikedDetails={this.userLikedDetails}
              each={each}
              key={v4()}
            />
          ))}
        </div>
      </div>
    )
  }

  onGetPostFailureView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryPost}
      >
        retry
      </button>
    </div>
  )

  onRetryPost = () => this.renderSuccessViewPost()

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onRenderStoryView = () => {
    const {instaStories} = this.state
    return (
      <ul className="story-container">
        {instaStories.map(each => (
          <InstaStories each={each} key={v4()} />
        ))}
      </ul>
    )
  }

  onGetStoryFailureView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryPost}
      >
        retry
      </button>
    </div>
  )

  renderDisplayedPost = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onRenderPostView()
      case apiStatusConstants.failure:
        return this.onGetPostFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderDisplayedStories = () => {
    const {apiStatusStories} = this.state
    switch (apiStatusStories) {
      case apiStatusConstantsStories.success:
        return this.onRenderStoryView()
      case apiStatusConstantsStories.failure:
        return this.onGetStoryFailureView()
      case apiStatusConstantsStories.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderEmptyView = () => {
    const {data} = this.state
    if (data.length === 0) {
      return (
        <div className="zero-search-result">
          <img
            src="https://res.cloudinary.com/aravindswamy534/image/upload/v1643671547/react%20insta%20share/Group_slfj48.png"
            alt="search not found"
          />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      )
    }
    return null
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {data} = this.state

    return (
      <div>
        <Header userEnteredSearchedValue={this.userEnteredSearchedValue} />
        {this.renderDisplayedStories()}
        {this.renderDisplayedPost()}
        <div>{data.length === 0 && this.renderEmptyView()}</div>
      </div>
    )
  }
}

export default Home
