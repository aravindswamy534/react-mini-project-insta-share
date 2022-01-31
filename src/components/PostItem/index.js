import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'

import {Component} from 'react'
import Comment from '../Comment'
import './index.css'

class PostItem extends Component {
  state = {isClicked: true}

  toggleLikeFont = async () => {
    const {each} = this.props
    const {postId} = each
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
    // const {isClicked} = this.state
    // const toggledAns = isClicked ? 'un_like' : 'like'
    // const jwtToken = Cookies.get('jwt_token')
    // const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${jwtToken}`,
    // //   },
    // }
    // const response = await fetch(apiUrl, options)
    // const data = await response.json()
    // console.log(data)
  }

  render() {
    const {isClicked} = this.state
    const {each} = this.props
    const {
      comments,
      createdAt,
      likesCount,
      postDetailsCaption,
      postDetailsImageUrl,
      postId,
      profilePic,
      userId,
      userName,
    } = each

    return (
      <li className="post-container">
        <div className="profile-name-container">
          <img
            className="profile-pic-icon"
            src={profilePic}
            alt="post author profile"
          />
          <p className="profile-name">{userName}</p>
        </div>
        <img className="posted-image" src={postDetailsImageUrl} alt="post" />
        <div className="icon-container">
          <button
            className="like-button"
            onClick={this.toggleLikeFont}
            type="button"
          >
            {isClicked ? (
              <BsHeart testid="likeIcon" />
            ) : (
              <FcLike testid="unLikeIcon" />
            )}
          </button>
          <FaRegComment className="message-icon" />
          <BiShareAlt className="share-icon" />
        </div>
        <div>
          <p>{likesCount} likes</p>
        </div>
        <div>
          <p>{postDetailsCaption}</p>
        </div>
        <ul>
          {comments.map(each2 => (
            <Comment each={each2} key={each2.userId} />
          ))}
        </ul>
        <p>{createdAt}</p>
      </li>
    )
  }
}

export default PostItem
