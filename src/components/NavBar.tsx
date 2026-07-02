import parkWaitLogo from "../asset/img/faviconpark.png";
import "../css/NavBar.css";

function NavBar() {
	return (
		<section className="NavBar">
			<article className="imgNavBar">
				<img src={parkWaitLogo} alt="ParkWait Logo" width="50" height="50" />
				<h1>Park Wait</h1>
			</article>
			<article className="LastUpdate_Refresh">
				<p>Last update</p>
				<button type="button">Refresh</button>
			</article>
		</section>
	);
}

export default NavBar;
