import Avatar from "./Avatar";
import ComplexComment from "./ComplexComment";
function UserInfo(props) {

    // const author = props.author;

  return (

    <div className="UserInfo">
      {/* <img
        className="Avatar"
        src={props.author.avatarUrl}
        alt={props.author.name}
      /> */}
      <Avatar author={props.author}></Avatar>
      <div className="UserInfo-name">{props.author.name}</div>
    </div>

    // <div className="UserInfo">
    //   {author.avatarUrl ? (
    //     <img
    //       className="Avatar"
    //       src={author.avatarUrl}
    //       alt={author.name || ''}
    //     />
    //   ) : (
    //     <div className="Avatar-placeholder">No Image</div>
    //   )}
    //   <div className="UserInfo-name">{author.name || 'Unknown User'}</div>
    // </div>

  );
  
}

export default UserInfo;
