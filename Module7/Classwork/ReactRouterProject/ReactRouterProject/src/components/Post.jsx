import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";


function Post() {
  const { id } = useParams(); // custom hook to access dynamic params
  const { data: post } = useData("https://jsonplaceholder.typicode.com/posts/" + id);
  return (
    <div className="Post">
      {post ? (
        <>
          <h3>
            Post #{post.id}: {post.title}
          </h3>
          <p>{post.body}</p>
        </>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}

export default Post;
