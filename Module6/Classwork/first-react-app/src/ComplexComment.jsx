import Comment from "./Comment";
import UserInfo from "./UserInfo";
import Avatar from "./Avatar";
function ComplexComment(props) {
  // complex component which displays different elements of a comment
  return (
    <div className="Comment componentBox">
      
      <UserInfo author={props.author.author} ></UserInfo>

      {/* <Avatar></Avatar> */}

      <Comment {...props}></Comment>
      
      {/* <div className="Comment-text">
        {props.author.text}
      </div>
      <div className="Comment-date">
        {props.author.date.toLocaleString()}
      </div> */}
    </div>
  );
} // save in a new file ComplexComment.jsx, then export it and import into App.jsx

export default ComplexComment
