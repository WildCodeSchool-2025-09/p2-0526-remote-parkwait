import type { FilterButtonProps } from "../types";
import "../css/FilterButton.css";

function FilterButton({
	label,
	isActive,
	onClick,
	icon,
	plainIcon,
}: FilterButtonProps) {
	return (
		<button
			type="button"
			className={`filter-btn ${isActive ? "active" : ""}`}
			onClick={onClick}
			aria-pressed={isActive}
		>
			{icon && (
				<span
					className="filter-btn-icon"
					style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
				/>
			)}
			{plainIcon && (
				<img src={plainIcon} alt="" className="filter-btn-icon-img" />
			)}
			{label}
		</button>
	);
}

export default FilterButton;
