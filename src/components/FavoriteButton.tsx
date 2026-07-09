import favIconEmpty from "../asset/img/icons/favempty.svg";
import favIconFilled from "../asset/img/icons/favfull.svg";

interface FavoriteItem {
	id: number;
	name: string;
}

interface FavoriteButtonProps<T extends FavoriteItem> {
	item: T;
	favorites: T[];
	onToggle: (item: T) => void;
}

function FavoriteButton<T extends FavoriteItem>({
	item,
	favorites,
	onToggle,
}: FavoriteButtonProps<T>) {
	const isFavorite = favorites.some((fav) => fav.id === item.id);

	function handleClick() {
		onToggle(item);
	}

	return (
		<button
			type="button"
			className={`icon-button favorite-button${isFavorite ? " is-active" : ""}`}
			onClick={handleClick}
			aria-label={
				isFavorite
					? `Retirer ${item.name} des favoris`
					: `Ajouter ${item.name} aux favoris`
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
