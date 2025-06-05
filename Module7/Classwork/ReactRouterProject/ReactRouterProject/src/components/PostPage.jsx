import { Outlet} from "react-router-dom";
// import { useData } from "../hooks/useData";

// save as pages/PostsPage.jsx
function PostsPage() {
  return (
    <div className="Posts">
      <h1>Posts</h1>
      <Outlet />
    </div>
  );
}

export default PostsPage

