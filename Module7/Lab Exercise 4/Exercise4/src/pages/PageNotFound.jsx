import { Link } from "react-router-dom";

function PageNotFound(props){

    return(
        <>
        <h1>Page Not Found!</h1>
        <Link to="/">Go to Home</Link>
        </>
    )
}
export default PageNotFound;