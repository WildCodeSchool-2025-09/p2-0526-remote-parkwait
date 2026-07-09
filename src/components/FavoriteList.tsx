import type { Ride } from "../types";
import "../css/FavoriteList.css";
import favIconFilled from "../asset/img/icons/favfull.svg";

function FavoriteList({ favoriteRides }: { favoriteRides: Ride[] }) {
	// on sépare les favoris ouverts et fermés, comme dans RideList
	const openFavorites = favoriteRides.filter((ride) => ride.is_open);
	const closedFavorites = favoriteRides.filter((ride) => !ride.is_open);

	return (
		<section className="favorites-page" aria-labelledby="favorites-heading">
			<h1 id="favorites-heading" className="favorites-title">
				♡ FAVORIS ({favoriteRides.length})
			</h1>

			{/* Message si aucun favori du tout */}
			{favoriteRides.length === 0 && (
				<p className="favorites-empty">
					Vous n'avez pas encore ajouté de favoris. Cliquez sur le cœur d'une
					attraction pour l'ajouter ici.
				</p>
			)}

			{/* Liste des favoris ouverts */}
			{openFavorites.length > 0 && (
				<ul className="favorites-list">
					{openFavorites.map((ride, index) => (
						<li key={ride.id} className="favorite-item">
							<article className="favorite-content">
								<span className="favorite-number" aria-hidden="true">
									{index + 1}
								</span>

								<div className="favorite-text">
									<h2>{ride.name}</h2>
								</div>

								<div className="favorite-actions">
									<span className="favorite-wait">
										{ride.wait_time} min d'attente
									</span>
									<img
										src={favIconFilled}
										className="favIcon"
										alt={`${ride.name} est dans vos favoris`}
									/>
								</div>
							</article>
						</li>
					))}
				</ul>
			)}

			{/* Section séparée pour les favoris fermés */}
			{closedFavorites.length > 0 && (
				<section
					className="closed-favorites-section"
					aria-labelledby="closed-favorites-heading"
				>
					<h2 id="closed-favorites-heading">
						FERMÉES ({closedFavorites.length})
					</h2>
					<ul className="favorites-list closed-list">
						{closedFavorites.map((ride) => (
							<li key={ride.id} className="favorite-item closed">
								<article className="favorite-content">
									<div className="favorite-text">
										<h3>{ride.name}</h3>
									</div>

									<div className="favorite-actions">
										<span className="favorite-status">Fermé</span>
										<img
											src={favIconFilled}
											className="favIcon"
											alt={`${ride.name} est dans vos favoris`}
										/>
									</div>
								</article>
							</li>
						))}
					</ul>
				</section>
			)}
		</section>
	);
}

export default FavoriteList;
