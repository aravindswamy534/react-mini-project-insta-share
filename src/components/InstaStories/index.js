import './index.css'

const InstaStories = props => {
  const {each} = props
  const {storyUrl, userId, userName} = each

  return (
    <li className="card-post-container">
      <img className="stories-icon" src={storyUrl} alt={userName} />{' '}
    </li>
  )
}

export default InstaStories
