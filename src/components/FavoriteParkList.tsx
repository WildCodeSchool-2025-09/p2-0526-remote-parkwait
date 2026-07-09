import type { Park } from "../types";
import "../css/FavoriteList.css";
import favIconFilled from "../asset/img/icons/favfull.svg";

function FavoriteParkList({ favoriteParks }: { favoriteParks: Park[] }) {
	return (
		<section
			className="favorites-page"
			aria-labelledby="favorite-parks-heading"
		>
			<h1 id="favorite-parks-heading" className="favorites-title">
				♡ PARCS FAVORIS ({favoriteParks.length})
			</h1>

			{favoriteParks.length === 0 && (
				<p className="favorites-empty">
					Vous n'avez pas encore ajouté de parc en favoris. Cliquez sur le cœur
					d'un parc pour l'ajouter ici.
				</p>
			)}

			{favoriteParks.length > 0 && (
				<ul className="favorites-list">
					{favoriteParks.map((park, index) => (
						<li key={park.id} className="favorite-item">
							<article className="favorite-content">
								<span className="favorite-number" aria-hidden="true">
									{index + 1}
								</span>

								<div className="favorite-text">
									<h2>{park.name}</h2>
								</div>

								<div className="favorite-actions">
									<span className="favorite-wait">{park.country}</span>
									<img
										src={favIconFilled}
										className="favIcon"
										alt={`${park.name} est dans vos favoris`}
									/>
								</div>
							</article>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default FavoriteParkList;
