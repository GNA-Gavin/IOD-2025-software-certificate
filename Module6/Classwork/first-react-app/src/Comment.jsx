// simpler Comment component with the user info section extracted out into its own component
import FormattedDate from "../FormattedDate";
function Comment(props) {
  return (
    <>
    {/* // <div className="Comment componentBox"> */}
      {/* <UserInfo user={props.author} /> */}
      {/* here we pass the author prop down to the UserInfo component */}
      <div className="Comment-text">{props.author.text}</div>
      <FormattedDate author={props.author}></FormattedDate>
      {/* <div className="Comment-date">{props.author.date.toLocaleString()}</div> */}
    {/* // </div> */}
    </>

  );
}

export default Comment
