import "./PageNotFount.css";
import error from "../../../Assets/Images/404-error.png"

function PageNotFount(): JSX.Element {
    return (
        <div className="PageNotFount">
			<img className="error" src="error"></img>
        </div>
    );
}

export default PageNotFount;
