import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfileDetailedView = props => {
  const {each} = props
  const {
    followersCount,
    followingCount,
    id,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = each

  return (
    <div>
      <div>
        <div>
          <img alt="user profile" src={profilePic} />
        </div>
        <div>
          <div>
            <h1>{userName}</h1>
          </div>
          <div>
            <div>
              <h1>{postsCount} posts</h1>
            </div>
            <div>
              <p>{followersCount} followers</p>
            </div>
            <div>
              <p>{followingCount} following</p>
            </div>
          </div>
          <div>
            <p>{userId}</p>
          </div>
          <div>
            <p>{userBio}</p>
          </div>
        </div>
      </div>
      <ul className="profile-stories-icon-container">
        {stories.length !== 0 ? (
          stories.map(each2 => (
            <li key={each2.id}>
              <img
                alt="user story"
                className="stories-icon-profile"
                src={each2.image}
              />
            </li>
          ))
        ) : (
          <div>
            <p>
              <BiCamera />
            </p>
            <p>No Stories Yet</p>
          </div>
        )}
      </ul>
      <div>
        <p>
          <BsGrid3X3 /> Posts
        </p>
      </div>
      <ul className="profile-posts-icon-container">
        {posts.length !== 0 ? (
          posts.map(each3 => (
            <li key={each3.id}>
              <img
                alt="user post"
                className="post-icon-profile"
                src={each3.image}
              />
            </li>
          ))
        ) : (
          <div>
            <p>
              <BiCamera />
            </p>
            <h1>No Posts</h1>
          </div>
        )}
      </ul>
    </div>
  )
}

export default ProfileDetailedView
