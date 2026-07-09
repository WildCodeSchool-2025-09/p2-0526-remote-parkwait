import type { ReactNode } from "react";
import "../css/FavoriteList.css";
import favIconFilled from "../asset/img/icons/favfull.svg";

interface FavoriteItem {
	id: number;
	name: string;
}

interface FavoriteListProps<T extends FavoriteItem> {
	title: string;
	items: T[];
	emptyMessage: string;
	renderStatus: (item: T) => ReactNode;
	isOpen?: (item: T) => boolean;
}

function FavoriteList<T extends FavoriteItem>({
	title,
	items,
	emptyMessage,
	renderStatus,
	isOpen,
}: FavoriteListProps<T>) {
	const openItems = isOpen ? items.filter(isOpen) : items;
	const closedItems = isOpen ? items.filter((item) => !isOpen(item)) : [];

	return (
		<section className="favorites-page" aria-labelledby="favorites-heading">
			<h1 id="favorites-heading" className="favorites-title">
				♡ {title} ({items.length})
			</h1>

			{items.length === 0 && <p className="favorites-empty">{emptyMessage}</p>}

			{openItems.length > 0 && (
				<ul className="favorites-list">
					{openItems.map((item, index) => (
						<li key={item.id} className="favorite-item">
							<article className="favorite-content">
								<span className="favorite-number" aria-hidden="true">
									{index + 1}
								</span>

								<div className="favorite-text">
									<h2>{item.name}</h2>
								</div>

								<div className="favorite-actions">
									<span className="favorite-wait">{renderStatus(item)}</span>
									<img
										src={favIconFilled}
										className="favIcon"
										alt={`${item.name} est dans vos favoris`}
									/>
								</div>
							</article>
						</li>
					))}
				</ul>
			)}

			{closedItems.length > 0 && (
				<section
					className="closed-favorites-section"
					aria-labelledby="closed-favorites-heading"
				>
					<h2 id="closed-favorites-heading">FERMÉES ({closedItems.length})</h2>
					<ul className="favorites-list closed-list">
						{closedItems.map((item) => (
							<li key={item.id} className="favorite-item closed">
								<article className="favorite-content">
									<div className="favorite-text">
										<h3>{item.name}</h3>
									</div>

									<div className="favorite-actions">
										<span className="favorite-status">Fermé</span>
										<img
											src={favIconFilled}
											className="favIcon"
											alt={`${item.name} est dans vos favoris`}
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
