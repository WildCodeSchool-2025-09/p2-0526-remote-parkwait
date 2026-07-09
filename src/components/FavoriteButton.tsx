import { useState } from "react";
import favIconEmpty from "../asset/img/icons/favempty.svg";
import favIconFilled from "../asset/img/icons/favfull.svg";

interface FavoriteButtonProps {
	rideName: string;
}

function FavoriteButton({ rideName }: FavoriteButtonProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<button
			type="button"
			className={`icon-button favorite-button${isFavorite ? " is-active" : ""}`}
			onClick={() => setIsFavorite(!isFavorite)}
			aria-label={
				isFavorite
					? `Retirer ${rideName} des favoris`
					: `Ajouter ${rideName} aux favoris`
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
