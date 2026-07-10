import { Link } from "react-router-dom";
import parkWaitLogo from "../asset/img/faviconpark.png";
import "../css/NavBar.css";

function NavBar() {
	return (
		<nav className="NavBar">
			<article className="imgNavBar">
				<img src={parkWaitLogo} alt="ParkWait Logo" width="50" height="50" />
				<h1>Park Wait</h1>
			</article>
			<article className="NavBar-links">
				<Link to="/favorites" className="favorites-link">
					Mes favoris
				</Link>
				<Link to="/favorite-parks" className="favorites-link">
					Mes parcs favoris
				</Link>
			</article>
			<article className="LastUpdate_Refresh">
				<p>Last update</p>
				<button type="button">Refresh</button>
			</article>
		</nav>
	);
}

export default NavBar;
