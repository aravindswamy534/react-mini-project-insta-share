import './index.css'

const Comment = props => {
  const {each} = props
  const {userName, comment} = each
  return (
    <p>
      <span className="username-heading">{userName} : </span>
      {comment}
    </p>
  )
}

export default Comment
