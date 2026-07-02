import { NavLink } from "react-router-dom";
import "../css/FavoriteButton.css";

function FavoriteButton() {
	return (
		<NavLink
			to="/favorite"
			className={({ isActive }) =>
				`favorite-button${isActive ? " is-active" : ""}`
			}
		>
			<img src="/icons/favempty.svg" alt="favoris" />
			Favoris
		</NavLink>
	);
}

export default FavoriteButton;
