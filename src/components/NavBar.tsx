import { Link } from "react-router-dom";
import parkWaitLogo from "../asset/img/faviconpark.png";
import "../css/NavBar.css";

function NavBar() {
	return (
		<section className="NavBar">
			<Link to="/" className="imgNavBar">
				<img src={parkWaitLogo} alt="ParkWait Logo" width="50" height="50" />
				<h1 className="NavBar-title">
					Park<span className="NavBar-title-accent">Wait</span>
				</h1>
			</Link>
			<article className="LastUpdate_Refresh">
				<p>Last update</p>
				<button type="button">Refresh</button>
			</article>
		</section>
	);
}

export default NavBar;
