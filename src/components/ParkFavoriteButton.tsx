import favIconEmpty from "../asset/img/icons/favempty.svg";
import favIconFilled from "../asset/img/icons/favfull.svg";
import type { Park } from "../types";

function ParkFavoriteButton({
	park,
	addFavoritePark,
	favoriteParks,
}: {
	park: Park;
	addFavoritePark: (park: Park) => void;
	favoriteParks: Park[];
}) {
	const isFavorite = favoriteParks.some((fav) => fav.id === park.id);

	function handleClick() {
		addFavoritePark(park);
	}

	return (
		<button
			type="button"
			className={`icon-button favorite-button${isFavorite ? " is-active" : ""}`}
			onClick={handleClick}
			aria-label={
				isFavorite
					? `Remove ${park.name} from favorites`
					: `Add ${park.name} to favorites`
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

export default ParkFavoriteButton;
