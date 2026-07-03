import favIconEmpty from "/icons/favempty.svg";
import favIconFilled from "/icons/favfull.svg";
import type { Ride } from "../types";

function FavoriteButton({
	ride,
	addFavorite,
	favoriteRides,
}: { ride: Ride; addFavorite: (ride: Ride) => void; favoriteRides: Ride[] }) {
	const isFavorite = favoriteRides.some((fav) => fav.id === ride.id);

	function handleClick() {
		addFavorite(ride);
	}

	return (
		<button
			type="button"
			className={`icon-button favorite-button${isFavorite ? " is-active" : ""}`}
			onClick={handleClick}
			aria-label={
				isFavorite
					? `Retirer ${ride.name} des favoris`
					: `Ajouter ${ride.name} aux favoris`
			}
			aria-pressed={isFavorite}
			title="Favoris"
		>
			<img
				src={isFavorite ? favIconFilled : favIconEmpty}
				className="favIcon"
				alt=""
			/>
		</button>
	);
}

export default FavoriteButton;
