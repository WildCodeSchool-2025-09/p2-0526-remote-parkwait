import favIconEmpty from "../asset/img/icons/favempty.svg";
import favIconFilled from "../asset/img/icons/favfull.svg";
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
					? `Remove ${ride.name} from favorites`
					: `Add ${ride.name} to favorites`
			}
			aria-pressed={isFavorite}
			title="Favorites"
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
