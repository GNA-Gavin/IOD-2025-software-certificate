import { useData } from "../hooks/useData";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get('limit') ? searchParams.get('limit') : 5;
  const { data: postsData } = useData(
    "https://jsonplaceholder.typicode.com/posts?_limit=" + limit
  );

  // the ? means only call map if postsData is not null
  const postList = postsData?.map((post) => (
    <li key={post.id}>
      <Link to={"/posts/" + post.id}>
      {" "}
        Post #{post.id}: {post.title}
      </Link>
    </li>
  ));
  return( 
  <> 
  <ul>{postList}</ul>
  <Link to="/posts?limit=10">Load 10 Posts</Link>
  </>
  )
}

export default PostList;

