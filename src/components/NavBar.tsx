import { Link } from "react-router-dom";
import parkWaitLogo from "../asset/img/faviconpark.png";
import "../css/NavBar.css";

function NavBar() {
	return (
		<section className="NavBar">
			<Link to="/" className="imgNavBar">
				<img src={parkWaitLogo} alt="" width="50" height="50" />
				<h1 className="NavBar-title">
					Park<span className="NavBar-title-accent">Wait</span>
				</h1>
			</Link>
		</section>
	);
}

export default NavBar;
